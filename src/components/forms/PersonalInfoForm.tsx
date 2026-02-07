'use client';

import { useResumeStore } from '@/lib/store';
import { Camera, X, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface PersonalInfoFormProps {
  hidePhoto?: boolean;
}

export function PersonalInfoForm({ hidePhoto = false }: PersonalInfoFormProps) {
  const { data, updatePersonalInfo, updateField } = useResumeStore();
  const info = data.personalInfo;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAltContact, setShowAltContact] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  // Auto-calculate age when birthday changes
  useEffect(() => {
    const match = info.birthday.match(/(\d+)年(\d+)月(\d+)日/);
    if (match) {
      const year = parseInt(match[1]);
      const month = parseInt(match[2]);
      const day = parseInt(match[3]);
      
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age >= 0 && age.toString() !== info.age) {
        updatePersonalInfo({ age: age.toString() });
      }
    }
  }, [info.birthday]);

  const handleSubmissionDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split('-');
    updateField('submissionDate', `${y}年${parseInt(m)}月${parseInt(d)}日`);
  };

  const getSubmissionDateValue = () => {
    const match = data.submissionDate.match(/(\d+)年(\d+)月(\d+)日/);
    if (match) {
      return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
    }
    return '';
  };

  const getDateValue = () => {
    const match = info.birthday.match(/(\d+)年(\d+)月(\d+)日/);
    if (match) {
      return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
    }
    return '';
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      updatePersonalInfo({ birthday: '', age: '' });
      return;
    }
    const [y, m, d] = val.split('-');
    updatePersonalInfo({ birthday: `${y}年${parseInt(m)}月${parseInt(d)}日` });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updatePersonalInfo({ photo: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all duration-200 ease-in-out";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2";
  const sectionClass = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6";

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      <div className={sectionClass}>
        <div>
          <label className={labelClass}><Calendar className="w-4 h-4 text-blue-500" /> 履歴書の日付（提出日）</label>
          <input type="date" value={getSubmissionDateValue()} onChange={handleSubmissionDateChange} className={inputClass} />
        </div>
      </div>

      <div className={sectionClass}>
        <div className="flex flex-col sm:flex-row gap-8">
          {!hidePhoto && (
            <div className="flex flex-col items-center sm:items-start gap-3">
               <label className={labelClass}>証明写真</label>
               <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all group overflow-hidden"
                style={{ width: '105px', height: '140px' }}
              >
                {info.photo ? (
                  <img src={info.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-slate-300 group-hover:text-blue-500 mb-2 transition-colors" />
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">写真を追加</span>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </div>
          )}

          <div className="flex-1 space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className={labelClass}>ふりがな</label>
                <input type="text" name="kana" value={info.kana} onChange={handleChange} placeholder="やまだ たろう" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>氏名</label>
                <input type="text" name="name" value={info.name} onChange={handleChange} placeholder="山田 太郎" className={inputClass} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>生年月日</label>
                <input type="date" value={getDateValue()} max={todayStr} onChange={handleDateChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>性別</label>
                <select name="gender" value={info.gender} onChange={handleChange} className={inputClass}>
                  <option value="">選択</option>
                  <option value="男">男</option>
                  <option value="女">女</option>
                  <option value="記載なし">記載なし</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">現住所・連絡先</h3>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <label className={labelClass}>郵便番号</label>
            <input type="text" name="postalCode" value={info.postalCode} onChange={handleChange} placeholder="123-4567" className={inputClass} />
          </div>
          <div className="col-span-12">
            <label className={labelClass}>ふりがな</label>
            <input type="text" name="addressKana" value={info.addressKana} onChange={handleChange} placeholder="とうきょうとしぶやく..." className={inputClass} />
          </div>
          <div className="col-span-12">
            <label className={labelClass}>住所</label>
            <input type="text" name="address" value={info.address} onChange={handleChange} placeholder="東京都渋谷区..." className={inputClass} />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <label className={labelClass}>電話番号（固定）</label>
            <input type="text" name="phone" value={info.phone} onChange={handleChange} placeholder="03-1234-5678" className={inputClass} />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <label className={labelClass}>携帯電話</label>
            <input type="text" name="mobile" value={info.mobile} onChange={handleChange} placeholder="090-1234-5678" className={inputClass} />
          </div>
          <div className="col-span-12">
            <label className={labelClass}>メールアドレス</label>
            <input type="email" name="email" value={info.email} onChange={handleChange} placeholder="example@mail.com" className={inputClass} />
          </div>
        </div>
      </div>

      <div className={sectionClass}>
        <button 
          onClick={() => setShowAltContact(!showAltContact)}
          className="w-full flex justify-between items-center text-sm font-bold text-slate-600 hover:text-slate-800"
        >
          <span className="flex items-center gap-2">連絡先（現住所以外）</span>
          {showAltContact ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {showAltContact && (
          <div className="grid grid-cols-12 gap-5 pt-4 animate-in fade-in duration-300 border-t border-slate-50 mt-2">
             <div className="col-span-4">
              <label className={labelClass}>郵便番号</label>
              <input type="text" name="altPostalCode" value={info.altPostalCode} onChange={handleChange} placeholder="123-4567" className={inputClass} />
            </div>
            <div className="col-span-12">
              <label className={labelClass}>ふりがな</label>
              <input type="text" name="altAddressKana" value={info.altAddressKana} onChange={handleChange} placeholder="とうきょうと..." className={inputClass} />
            </div>
            <div className="col-span-12">
              <label className={labelClass}>住所</label>
              <input type="text" name="altAddress" value={info.altAddress} onChange={handleChange} placeholder="東京都..." className={inputClass} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}