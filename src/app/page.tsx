/*
Homepage (App Router, Komponen Server)

karena file ini berada di dalam folder `app`, maka akan diexecute di server secara default.
yang berarti, bisa ngejalanin run async/await pemanggilan data dari database disini.
*/

import { supabase } from "../lib/supabase"; //import supabase client yang udah kita buat di lib/supabase.ts

/*
Homepage adalah fungsi async karena kita akan mengambil data dari database.
ketika next.js menemukan fungsi komponen server asinkron, ia akan wait
untuk resolve promise-nya sebelum merender halaman.
*/

export default async function HomePage(){
  /*
  query data dari tabel "projects"
  */

  const { data: projects, error } = await supabase
    .from('Projects') //nama tabel
    .select('*')     //ambil semua kolom
    .order('created_at',{ ascending: false });

    /*
    handle query error
    */
  if (error) {
    console.error('[supabase] error:', error); //log error ke console
    return (
      <p className="p-8 text-red-600">
        Failed to load database. Check console.
      </p>
    )
  }

  /*
  render page nya
  */

  return (
    <main className="max-w-xl mx-auto p-8">
      {}
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

      {/* warning kalo project nya kosong */}
      {projects?.length === 0 && <p>No projects yet.</p>}

      {/* list tiap project */}
      <ul className="space-y-4">
        {projects?.map((p) => (
          <li key={p.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{p.title}</h2>

            {/* tampilin desc kalo ad */}
            {p.description && <p className="mt-2">{p.description}</p>}

            {/* live demo kalai situs_url ada */}
            {p.site_url && (
              <a
                href={p.site_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                Live demo
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}