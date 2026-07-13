import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const PrintReport = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Parse parameters from query string
  const params = new URLSearchParams(window.location.search);
  const section = params.get('section') || 'All';
  const date = params.get('date');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedReportDate = () => {
    if (date) {
      return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    } else if (startDate && endDate) {
      return `${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`;
    }
    return new Date(getTodayDateString()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('section', section);
        if (date) queryParams.append('date', date);
        if (startDate) queryParams.append('startDate', startDate);
        if (endDate) queryParams.append('endDate', endDate);

        const res = await fetch(`/api/reports/absentees?${queryParams.toString()}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error('Error fetching print report data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, section, date, startDate, endDate]);

  // Auto trigger browser print once data is loaded and DOM is fully mounted
  useEffect(() => {
    if (!loading && data.length >= 0) {
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
          <p className="text-sm font-semibold">Generating Academic Report Document...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-8 font-serif leading-relaxed max-w-4xl mx-auto">
      
      {/* College Letterhead Heading */}
      <div className="text-center border-b-4 border-double border-slate-900 pb-4 mb-6">
        <h1 className="text-2xl font-black tracking-wide uppercase text-slate-900">
          NARASARAOPETA ENGINEERING COLLEGE
        </h1>
        <h2 className="text-lg font-bold tracking-normal uppercase text-slate-800 mt-1">
          NARASARAOPET (AUTONOMOUS)
        </h2>
        <h3 className="text-base font-extrabold uppercase text-slate-700 tracking-wide mt-1.5">
          DEPARTMENT OF CSE (EMERGING TECHNOLOGIES)
        </h3>
      </div>

      {/* Report Title */}
      <div className="text-center mb-6">
        <h4 className="text-lg font-black underline uppercase text-slate-900 tracking-wider">
          ABSENTEES DAILY REPORT
        </h4>
        <div className="flex justify-between items-center text-xs font-bold text-slate-700 mt-4 px-2">
          <span>Date: {formattedReportDate()}</span>
          <span>Section: {section === 'All' ? 'All Sections' : section}</span>
          <span>Total Absentees: {data.length}</span>
        </div>
      </div>

      {/* Data Table */}
      <div className="w-full">
        <table className="w-full text-left border-collapse border border-slate-900 text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-900">
              <th className="p-2 border border-slate-900 text-center w-10">S.No</th>
              <th className="p-2 border border-slate-900 w-24">Roll Number</th>
              <th className="p-2 border border-slate-900">Student Name</th>
              <th className="p-2 border border-slate-900 text-center w-16">Section</th>
              <th className="p-2 border border-slate-900 text-center w-14">Status</th>
              <th className="p-2 border border-slate-900 w-36">Mobile Numbers</th>
              <th className="p-2 border border-slate-900 text-center w-20">Call Status</th>
              <th className="p-2 border border-slate-900">Reason for Absence</th>
              <th className="p-2 border border-slate-900 text-right w-20">Called By</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const isLate = item.status === 'Late';
              return (
                <tr key={item.id} className="border-b border-slate-900">
                  <td className="p-2 border border-slate-900 text-center">{index + 1}</td>
                  <td className="p-2 border border-slate-900 font-semibold">{item.rollNumber}</td>
                  <td className="p-2 border border-slate-900 font-bold">{item.name}</td>
                  <td className="p-2 border border-slate-900 text-center font-medium">{item.section}</td>
                  <td className="p-2 border border-slate-900 text-center font-bold">
                    {item.status}
                  </td>
                  <td className="p-2 border border-slate-900 leading-tight">
                    <div>S: {item.studentMobile || '-'}</div>
                    <div className="mt-0.5">P: {item.parentMobile || '-'}</div>
                  </td>
                  <td className="p-2 border border-slate-900 text-center">
                    {item.called ? (
                      <span className="font-semibold">
                        {item.answered ? 'Answered' : 'Unanswered'}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Not Called</span>
                    )}
                  </td>
                  <td className="p-2 border border-slate-900 italic font-sans break-words max-w-[140px]">
                    {item.reason ? `"${item.reason}"` : '-'}
                  </td>
                  <td className="p-2 border border-slate-900 text-right font-medium">
                    {item.calledBy || '-'}
                  </td>
                </tr>
              );
            })}
            
            {data.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center p-8 font-bold text-slate-500">
                  No absentees or late entries recorded for this selection.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Signature Section */}
      <div className="mt-20 pt-8 border-t border-dashed border-slate-300">
        <div className="grid grid-cols-4 gap-6 text-center text-xs font-bold text-slate-800">
          <div className="flex flex-col justify-between h-20">
            <span className="border-b border-slate-400 w-3/4 mx-auto mb-2"></span>
            <span>CLASS REPRESENTATIVE</span>
          </div>
          <div className="flex flex-col justify-between h-20">
            <span className="border-b border-slate-400 w-3/4 mx-auto mb-2"></span>
            <span>ABSENT CONTROLLER</span>
          </div>
          <div className="flex flex-col justify-between h-20">
            <span className="border-b border-slate-400 w-3/4 mx-auto mb-2"></span>
            <span>HEAD OF DEPARTMENT (HOD)</span>
          </div>
          <div className="flex flex-col justify-between h-20">
            <span className="border-b border-slate-400 w-3/4 mx-auto mb-2"></span>
            <span>PRINCIPAL</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PrintReport;
