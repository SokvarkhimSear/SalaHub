"use client";

import React, { useState, useEffect } from "react";
import { fetchUniversitiesFromDB, updateUniversityInDB, addUniversityToDB, UniversityData } from "../../services/uniService";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [universities, setUniversities] = useState<UniversityData[]>([]);
  const [selectedUni, setSelectedUni] = useState<UniversityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchUniversitiesFromDB();
      setUniversities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (uni: UniversityData) => {
    setSelectedUni({ ...uni });
    setIsNew(false);
  };

  const handleNew = () => {
    setSelectedUni({
      id: "",
      name_en: "",
      name_kh: "",
      location_en: "",
      location_kh: "",
      tuitionRange: "",
      telegramUrl: "",
      tags: [],
      majors: [],
      primaryColor: "#0f172a",
      aboutInfo: "",
      scholarshipsInfo: "",
      websiteUrl: "",
      facebookUrl: "",
    });
    setIsNew(true);
  };

  const handleChange = (field: keyof UniversityData, value: any) => {
    if (!selectedUni) return;
    setSelectedUni({ ...selectedUni, [field]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedUni) return;
    const tags = e.target.value.split(",").map((t) => t.trim()).filter((t) => t);
    setSelectedUni({ ...selectedUni, tags });
  };

  const handleAddMajor = () => {
    if (!selectedUni) return;
    setSelectedUni({
      ...selectedUni,
      majors: [...(selectedUni.majors || []), { name: "", fee: "" }],
    });
  };

  const handleMajorChange = (index: number, field: "name" | "fee", value: string) => {
    if (!selectedUni || !selectedUni.majors) return;
    const newMajors = [...selectedUni.majors];
    newMajors[index][field] = value;
    setSelectedUni({ ...selectedUni, majors: newMajors });
  };

  const handleRemoveMajor = (index: number) => {
    if (!selectedUni || !selectedUni.majors) return;
    const newMajors = selectedUni.majors.filter((_, i) => i !== index);
    setSelectedUni({ ...selectedUni, majors: newMajors });
  };

  const handleSave = async () => {
    if (!selectedUni || !selectedUni.id) return alert("ID is required");
    setSaving(true);
    try {
      if (isNew) {
        await addUniversityToDB(selectedUni.id, selectedUni);
      } else {
        await updateUniversityInDB(selectedUni.id, selectedUni);
      }
      alert("Successfully saved to database!");
      await loadData();
      setIsNew(false);
    } catch (e: any) {
      alert("Error saving: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-full">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-y-auto max-h-[90vh]">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Universities</h1>
            <button 
              onClick={handleNew}
              className="p-2 bg-brand-blue/10 text-brand-blue rounded-lg hover:bg-brand-blue/20 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <p className="text-slate-500 text-center py-4">Loading data...</p>
          ) : (
            <div className="space-y-2">
              {universities.map((uni) => (
                <button
                  key={uni.id}
                  onClick={() => handleSelect(uni)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedUni?.id === uni.id 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{uni.name_en}</div>
                  <div className={`text-xs ${selectedUni?.id === uni.id ? 'text-slate-300' : 'text-slate-500'}`}>ID: {uni.id}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editor */}
        <div className="w-full md:w-2/3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-y-auto max-h-[90vh]">
          {!selectedUni ? (
            <div className="h-full flex items-center justify-center text-slate-400">
              Select a university to edit or create a new one.
            </div>
          ) : (
            <div className="space-y-6 pb-20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{isNew ? 'Create New University' : 'Edit University'}</h2>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md disabled:opacity-70"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">ID / Short Code (e.g. rupp)</label>
                  <input
                    value={selectedUni.id}
                    onChange={(e) => handleChange("id", e.target.value)}
                    disabled={!isNew}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50"
                  />
                  {!isNew && <p className="text-xs text-amber-600">ID cannot be changed after creation.</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Theme Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={selectedUni.primaryColor || '#0f172a'}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="w-10 h-10 rounded border border-slate-200 p-0.5 bg-slate-50"
                    />
                    <input
                      value={selectedUni.primaryColor || '#0f172a'}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Name (English)</label>
                  <input
                    value={selectedUni.name_en}
                    onChange={(e) => handleChange("name_en", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Name (Khmer)</label>
                  <input
                    value={selectedUni.name_kh}
                    onChange={(e) => handleChange("name_kh", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Location (English)</label>
                  <input
                    value={selectedUni.location_en}
                    onChange={(e) => handleChange("location_en", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Location (Khmer)</label>
                  <input
                    value={selectedUni.location_kh}
                    onChange={(e) => handleChange("location_kh", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Tags (Comma separated)</label>
                  <input
                    value={selectedUni.tags.join(", ")}
                    onChange={handleTagsChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder="Public, Engineering, ..."
                  />
                </div>
              </div>

              <hr className="border-slate-100" />
              <h3 className="text-lg font-bold">Content Details</h3>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">About Paragraph</label>
                  <textarea
                    value={selectedUni.aboutInfo || ""}
                    onChange={(e) => handleChange("aboutInfo", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder="Description of the university..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Scholarships Info</label>
                  <textarea
                    value={selectedUni.scholarshipsInfo || ""}
                    onChange={(e) => handleChange("scholarshipsInfo", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder="Details about available scholarships..."
                  />
                </div>
              </div>

              <hr className="border-slate-100" />
              <h3 className="text-lg font-bold">Links & Social</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Telegram Group URL</label>
                  <input
                    value={selectedUni.telegramUrl || ""}
                    onChange={(e) => handleChange("telegramUrl", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Website URL</label>
                  <input
                    value={selectedUni.websiteUrl || ""}
                    onChange={(e) => handleChange("websiteUrl", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600">Facebook Page URL</label>
                  <input
                    value={selectedUni.facebookUrl || ""}
                    onChange={(e) => handleChange("facebookUrl", e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <hr className="border-slate-100" />
              
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Available Majors</h3>
                <button
                  onClick={handleAddMajor}
                  className="text-sm px-3 py-1.5 bg-slate-100 hover:bg-slate-200 font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Major
                </button>
              </div>

              {(!selectedUni.majors || selectedUni.majors.length === 0) ? (
                <p className="text-slate-500 text-sm">No majors added yet.</p>
              ) : (
                <div className="space-y-3">
                  {selectedUni.majors.map((major, index) => (
                    <div key={index} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <input
                        value={major.name || ""}
                        onChange={(e) => handleMajorChange(index, "name", e.target.value)}
                        placeholder="Major Name"
                        className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                      <button
                        onClick={() => handleRemoveMajor(index)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
