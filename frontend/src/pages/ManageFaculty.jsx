import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Edit, UploadCloud, Users, Phone, Loader, Plus, X } from 'lucide-react';

const ManageFaculty = () => {
  const { token, user } = useAuth();
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Single edit state
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [editPhone, setEditPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Bulk upload state
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkData, setBulkData] = useState('');
  const [isBulkSaving, setIsBulkSaving] = useState(false);
  const [bulkMessage, setBulkMessage] = useState('');

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faculty', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setFaculty(data);
    } catch (err) {
      console.error('Failed to fetch faculty:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, [token]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingFaculty) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          facultyName: editingFaculty.facultyName,
          phoneNumber: editPhone,
        }),
      });
      if (res.ok) {
        await fetchFaculty();
        setEditingFaculty(null);
      } else {
        alert('Failed to update phone number');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving phone number');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    setIsBulkSaving(true);
    setBulkMessage('');
    try {
      // Parse bulkData. Format: Name, Phone per line
      const lines = bulkData.split('\n');
      const facultyList = [];
      for (const line of lines) {
        const parts = line.split(',');
        if (parts.length >= 1) {
          facultyList.push({
            facultyName: parts[0].trim(),
            phoneNumber: parts.length > 1 ? parts[1].trim() : '',
          });
        }
      }

      const res = await fetch('/api/faculty/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ facultyList }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setBulkMessage(data.message || 'Successfully uploaded faculty contacts.');
        setBulkData('');
        fetchFaculty();
        setTimeout(() => setShowBulkModal(false), 2000);
      } else {
        setBulkMessage(data.message || 'Failed to bulk upload');
      }
    } catch (err) {
      console.error(err);
      setBulkMessage('Error during bulk upload');
    } finally {
      setIsBulkSaving(false);
    }
  };

  const filteredFaculty = faculty.filter(f => 
    f.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.phoneNumber && f.phoneNumber.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-md">
        <div>
          <h2 className="text-2xl font-extrabold text-customText dark:text-customText-dark flex items-center gap-2">
            <Users size={24} className="text-primary-dark" />
            Faculty Contacts Management
          </h2>
          <p className="text-xs text-customText-muted dark:text-customText-mutedDark mt-1">
            Manage faculty phone numbers for click-to-dial dashboard feature
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/70 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-dark hover:bg-primary text-white rounded-xl font-bold text-sm shadow transition-all active:scale-[0.98]"
          >
            <UploadCloud size={16} />
            <span className="hidden sm:inline">Bulk Add/Update</span>
          </button>
        </div>
      </div>

      {/* Grid of Faculty */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFaculty.map(f => (
            <div key={f.id} className="glass-card p-4 flex flex-col justify-between hover:border-primary/30 transition-all group">
              <div>
                <h3 className="font-bold text-base text-customText dark:text-customText-dark truncate" title={f.facultyName}>
                  {f.facultyName}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-customText-muted dark:text-customText-mutedDark">
                  <Phone size={14} className={f.phoneNumber ? "text-green-500" : "text-slate-400"} />
                  <span>{f.phoneNumber || 'No phone number'}</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => {
                    setEditingFaculty(f);
                    setEditPhone(f.phoneNumber || '');
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-transparent hover:border-primary/20 transition-all"
                >
                  <Edit size={14} /> Edit Phone
                </button>
              </div>
            </div>
          ))}
          {filteredFaculty.length === 0 && (
            <div className="col-span-full text-center py-12 text-customText-muted border border-dashed rounded-xl">
              No faculty found. Timetable syncing might be required or adjust your search.
            </div>
          )}
        </div>
      )}

      {/* Single Edit Modal */}
      {editingFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setEditingFaculty(null)} />
          <form onSubmit={handleEditSubmit} className="relative glass-card bg-white dark:bg-slate-900 w-full max-w-sm p-6 shadow-2xl animate-fade-in z-10">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="font-extrabold text-lg text-customText">Edit Contact</h3>
              <button type="button" onClick={() => setEditingFaculty(null)} className="p-1 hover:bg-slate-100 rounded">
                <X size={18} />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-customText-muted uppercase mb-1">Faculty Name</label>
              <input type="text" value={editingFaculty.facultyName} disabled className="glass-input opacity-70" />
            </div>
            <div className="mb-6">
              <label className="block text-xs font-bold text-customText-muted uppercase mb-1">Phone Number</label>
              <input 
                type="tel" 
                value={editPhone} 
                onChange={(e) => setEditPhone(e.target.value)} 
                placeholder="+91..." 
                className="glass-input" 
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setEditingFaculty(null)} className="btn-secondary">Cancel</button>
              <button type="submit" disabled={isSaving} className="btn-primary">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowBulkModal(false)} />
          <div className="relative glass-card bg-white dark:bg-slate-900 w-full max-w-2xl p-6 shadow-2xl animate-fade-in z-10">
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="font-extrabold text-lg text-customText">Bulk Upload Faculty Contacts</h3>
              <button type="button" onClick={() => setShowBulkModal(false)} className="p-1 hover:bg-slate-100 rounded">
                <X size={18} />
              </button>
            </div>
            
            <p className="text-xs text-customText-muted mb-4">
              Format: <strong>Faculty Name, Phone Number</strong> (one per line). <br/>
              Example:<br/>
              Dr. John Doe, 9876543210<br/>
              Prof. Jane Smith, 8765432109
            </p>

            <form onSubmit={handleBulkUpload}>
              <textarea
                value={bulkData}
                onChange={(e) => setBulkData(e.target.value)}
                placeholder="Dr. John Doe, 9876543210&#10;Prof. Jane Smith, 8765432109"
                rows={8}
                className="glass-input w-full font-mono text-xs resize-none"
                required
              />

              {bulkMessage && (
                <div className={`mt-3 p-3 rounded-xl text-xs font-bold border ${bulkMessage.includes('Success') ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                  {bulkMessage}
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setShowBulkModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" disabled={isBulkSaving || !bulkData} className="btn-primary flex items-center gap-2">
                  <UploadCloud size={16} />
                  {isBulkSaving ? 'Uploading...' : 'Process Bulk Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFaculty;
