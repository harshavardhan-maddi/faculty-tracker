import React, { useRef } from 'react';
import logo from '../neclogo.png';
import { 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Printer, 
  X, 
  FileText, 
  AlertCircle,
  Phone,
  User,
  Calendar,
  Building2,
  Check,
  Download
} from 'lucide-react';

const OutpassTicketModal = ({ ticket, onClose }) => {
  const printAreaRef = useRef(null);

  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  // Status visual mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING_PARENT_CALL':
        return {
          label: 'Awaiting Parent Call Confirmation',
          color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
          step: 1
        };
      case 'FORWARDED_TO_HOD':
        return {
          label: 'Parent Confirmed • Forwarded to HOD',
          color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
          step: 2
        };
      case 'PERMISSION_GRANTED':
        return {
          label: 'Permission Granted by HOD • Ready at Gate',
          color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          step: 3
        };
      case 'SENT_OUT':
        return {
          label: 'Student Sent Out • Exited Campus',
          color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
          step: 4
        };
      case 'REJECTED':
        return {
          label: 'Application Rejected',
          color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
          step: -1
        };
      default:
        return {
          label: status,
          color: 'bg-slate-100 text-slate-600 border-slate-300',
          step: 1
        };
    }
  };

  const statusInfo = getStatusBadge(ticket.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white print:static">
      
      {/* Backdrop for click away */}
      <div className="fixed inset-0 print:hidden" onClick={onClose} />

      {/* Main Ticket Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden my-auto max-h-[92vh] flex flex-col print:max-w-none print:shadow-none print:border-0 print:rounded-none print:max-h-none print:overflow-visible">
        
        {/* Top Action Bar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-primary/10 text-primary-dark dark:text-primary">
              <FileText size={18} />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-customText dark:text-customText-dark">
                Official Campus Outpass Pass
              </h3>
              <p className="text-[11px] text-customText-muted dark:text-customText-mutedDark">
                Ref ID: <span className="font-mono font-bold text-primary">{ticket.id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white hover:bg-primary-dark text-xs font-bold shadow-md shadow-primary/20 transition-all cursor-pointer active:scale-95"
            >
              <Printer size={15} />
              <span>Print / Download PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div ref={printAreaRef} className="p-6 sm:p-8 space-y-6 overflow-y-auto print:overflow-visible print:p-6 print:space-y-4 text-customText dark:text-customText-dark">
          
          {/* Printable College Header */}
          <div className="border-b-2 border-primary/20 pb-5 text-center flex flex-col items-center relative">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
              <img 
                src={logo} 
                alt="NEC Logo" 
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full shadow-sm bg-white p-1 border border-slate-200" 
              />
              <div className="text-left">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-primary-dark uppercase">
                  Narasaraopeta Engineering College
                </h1>
                <p className="text-[10px] sm:text-xs font-bold text-customText-muted tracking-wider uppercase">
                  (Autonomous) • Approved by AICTE • Affiliated to JNTUK
                </p>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                  Kotappakonda Road, Yellamanda (P.O), Narasaraopet - 522601
                </p>
              </div>
            </div>

            <div className="inline-block mt-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary-dark font-extrabold text-xs tracking-widest uppercase shadow-sm">
              Student Campus Outpass Ticket
            </div>
          </div>

          {/* Ticket Header Meta Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <div>
              <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block">
                Ticket ID
              </span>
              <span className="font-mono font-bold text-primary-dark dark:text-primary">
                {ticket.id}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block">
                Applied Date
              </span>
              <span className="font-semibold">
                {ticket.appliedDate}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block">
                Applied Time
              </span>
              <span className="font-semibold">
                {ticket.appliedTime}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider block">
                Live Status
              </span>
              <span className={`inline-block px-2 py-0.5 mt-0.5 rounded-md text-[10px] font-extrabold border ${statusInfo.color}`}>
                {ticket.status.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          {/* 4-Step Approval Tracker (Visible on screen and print) */}
          <div className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-800/50">
            <h4 className="text-[11px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase tracking-wider mb-3">
              Application Clearance Stages
            </h4>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              
              {/* Step 1: Student Applied */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white bg-emerald-500 shadow-md">
                  <Check size={16} />
                </div>
                <span className="font-bold text-[11px] mt-1.5">1. Applied</span>
                <span className="text-[9px] text-customText-muted">By Student</span>
              </div>

              {/* Step 2: Parent Call Verified */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${
                  ticket.absentControllerAction?.confirmed 
                    ? 'bg-emerald-500' 
                    : ticket.status === 'REJECTED' && ticket.rejectionStage === 'ABSENT_CONTROLLER'
                      ? 'bg-rose-500'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  {ticket.absentControllerAction?.confirmed ? (
                    <Check size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                </div>
                <span className="font-bold text-[11px] mt-1.5">2. Parent Call</span>
                <span className="text-[9px] text-customText-muted">
                  {ticket.absentControllerAction?.confirmed ? 'Confirmed OK' : 'Pending Call'}
                </span>
              </div>

              {/* Step 3: HOD Granted */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${
                  ticket.hodAction?.granted 
                    ? 'bg-emerald-500' 
                    : ticket.status === 'REJECTED' && ticket.rejectionStage === 'HOD'
                      ? 'bg-rose-500'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  {ticket.hodAction?.granted ? (
                    <Check size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                </div>
                <span className="font-bold text-[11px] mt-1.5">3. HOD Approval</span>
                <span className="text-[9px] text-customText-muted">
                  {ticket.hodAction?.granted ? 'Granted' : 'Pending HOD'}
                </span>
              </div>

              {/* Step 4: Gate Watchman Sent Out */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-md transition-all ${
                  ticket.watchmanAction?.sentOut 
                    ? 'bg-purple-600' 
                    : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                }`}>
                  {ticket.watchmanAction?.sentOut ? (
                    <Check size={16} />
                  ) : (
                    <ShieldCheck size={16} />
                  )}
                </div>
                <span className="font-bold text-[11px] mt-1.5">4. Gate Exit</span>
                <span className="text-[9px] text-customText-muted">
                  {ticket.watchmanAction?.sentOut ? 'Sent Out' : 'Physical ID Check'}
                </span>
              </div>

            </div>
          </div>

          {/* Student Profile Information Card */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900/50 space-y-4">
            <h4 className="text-xs font-bold text-primary-dark dark:text-primary uppercase tracking-wider flex items-center gap-1.5">
              <User size={15} />
              <span>Student & Verification Particulars</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase">
                  Student Name
                </span>
                <p className="font-extrabold text-sm">{ticket.studentName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase">
                  Roll Number
                </span>
                <p className="font-mono font-extrabold text-sm text-primary-dark dark:text-primary">
                  {ticket.rollNumber}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase">
                  Class / Section
                </span>
                <p className="font-bold">{ticket.section}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase">
                  Student Mobile (Masked)
                </span>
                <p className="font-mono font-semibold">
                  {ticket.maskedStudentMobile || (ticket.studentMobile ? '••••••' + String(ticket.studentMobile).slice(-4) : '••••••0000')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase">
                  Parent Contact (Masked)
                </span>
                <p className="font-mono font-semibold">
                  {ticket.maskedParentMobile || (ticket.parentMobile ? '••••••' + String(ticket.parentMobile).slice(-4) : '••••••0000')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase">
                  Destination / Expected Return
                </span>
                <p className="font-semibold">{ticket.destination} ({ticket.expectedReturnTime})</p>
              </div>
            </div>

            {/* Outpass Reason Section */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold text-customText-muted dark:text-customText-mutedDark uppercase block mb-1">
                Reason Stated for Going Out
              </span>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs font-medium leading-relaxed">
                "{ticket.reason}"
              </div>
            </div>
          </div>

          {/* Verification Stamps & Signatures Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Stamp 1: Absent Controller */}
            <div className={`p-4 rounded-2xl border text-xs flex flex-col justify-between ${
              ticket.absentControllerAction?.confirmed
                ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30'
            }`}>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-customText-muted block">
                  Parent Phone Call Check
                </span>
                <p className="font-bold mt-1">
                  {ticket.absentControllerAction?.controllerName || 'Absent Controller'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                {ticket.absentControllerAction?.confirmed ? (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Parent Confirmed ({ticket.absentControllerAction.displayTime})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
                    <Clock size={12} /> Awaiting Call
                  </span>
                )}
              </div>
            </div>

            {/* Stamp 2: HOD Grant */}
            <div className={`p-4 rounded-2xl border text-xs flex flex-col justify-between ${
              ticket.hodAction?.granted
                ? 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30'
            }`}>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-customText-muted block">
                  Department Approval
                </span>
                <p className="font-bold mt-1">
                  {ticket.hodAction?.hodName || 'Head of Department (HOD)'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                {ticket.hodAction?.granted ? (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Approved ({ticket.hodAction.displayTime})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock size={12} /> Pending HOD
                  </span>
                )}
              </div>
            </div>

            {/* Stamp 3: Watchman Gate Release */}
            <div className={`p-4 rounded-2xl border text-xs flex flex-col justify-between ${
              ticket.watchmanAction?.sentOut
                ? 'border-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/30'
            }`}>
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-customText-muted block">
                  Main Gate Verification
                </span>
                <p className="font-bold mt-1">
                  {ticket.watchmanAction?.watchmanName || 'Main Gate Security Officer'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                {ticket.watchmanAction?.sentOut ? (
                  <div className="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1">
                    <ShieldCheck size={13} />
                    <span>Sent Out ({ticket.watchmanAction.displayTime})</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <ShieldCheck size={12} /> Pending Physical ID
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Security Notice / Bottom Watermark */}
          <div className="pt-3 text-center border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] text-customText-muted font-medium">
              Note: This is a digitally verified campus gate pass generated by Lectra Portal. The student must carry their Physical College ID Card to present to the Main Gate Security Guard.
            </p>
          </div>

        </div>

        {/* Footer actions for modal (print:hidden) */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex justify-between items-center print:hidden shrink-0">
          <span className="text-xs text-customText-muted dark:text-customText-mutedDark font-medium">
            Keep this ticket or reference ID handy.
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-primary py-2 px-4 text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Download size={14} />
              <span>Download / Print Ticket</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary py-2 px-4 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default OutpassTicketModal;
