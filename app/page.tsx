'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Dashboard() {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('v_progress_summary').select('*');
      if (error) console.error('Error:', error);
      else setProgressData(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">FTTH Project Progress Dashboard</h1>
      {loading ? (
        <p>Memuat data progres...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Cluster</th>
                <th className="border border-gray-300 p-2">Item SOW</th>
                <th className="border border-gray-300 p-2">Target BOQ</th>
                <th className="border border-gray-300 p-2">Realisasi</th>
                <th className="border border-gray-300 p-2">Sisa</th>
                <th className="border border-gray-300 p-2">Progres (%)</th>
              </tr>
            </thead>
            <tbody>
              {progressData.map((row, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border border-gray-300 p-2">{row.cluster_name}</td>
                  <td className="border border-gray-300 p-2">{row.sow_item_name}</td>
                  <td className="border border-gray-300 p-2">{row.boq_target}</td>
                  <td className="border border-gray-300 p-2">{row.total_actual_volume}</td>
                  <td className="border border-gray-300 p-2">{row.remaining_volume}</td>
                  <td className="border border-gray-300 p-2 font-semibold">{row.progress_percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
