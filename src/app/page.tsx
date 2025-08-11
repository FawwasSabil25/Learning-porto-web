/*
Homepage (App Router, Komponen Server)

karena file ini berada di dalam folder `app`, maka akan diexecute di server secara default.
yang berarti, bisa ngejalanin run async/await pemanggilan data dari database disini.
*/

import { supabase } from "../lib/supabase"; //import supabase client yang udah kita buat di lib/supabase.ts
import Link from "next/link";

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
    <div className="container mx-auto mt-15"> {/* main container */}
      <div className="flex items-center justify-between p-20 mb-8 bg-blue-900 rounded-3xl">
        {/* Text on the left */}
        <div>
          <h1 className="mb-4 text-6xl font-extrabold text-white">Hi!, I&apos;m Fawwas!</h1>
          <h1 className="text-3xl font-bold text-white">Backend Dev</h1>
          <h2 className="mt-4 text-xl text-white">Informatics student in Pasundan University</h2>
          <h2 className="text-xl text-white">currently third year and still going strong! </h2>
          <Link
            href="/projects"
            className="inline-block px-6 py-3 mt-10 text-lg font-semibold text-blue-900 transition bg-white rounded-full shadow hover:bg-blue-100"
            >
            My Projects
          </Link>
        </div>
        {/* Image on the right */}
        <img
          src="/img/fawas.png" 
          alt="me"
          className="object-cover ml-8 rounded-full h-50 w-50"
        />
      </div>
        <main className="max-w-xl p-8 mx-auto mt-40">
        <h1 className="mb-6 text-3xl font-bold text-center">My Projects</h1>

        {/* warning kalo project nya kosong */}
        {projects?.length === 0 && <p>No projects yet.</p>}

        {/* list tiap project */}
        <ul className="flex flex-row flex-wrap justify-center gap-4">
          {projects?.map((p) => (
            <li key={p.id} className="p-4 border rounded-lg min-w-[250px]">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              {p.description && <p className="mt-2">{p.description}</p>}
              {p.site_url && (
                <a
                  href={p.site_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-blue-600 underline"
                >
                  Live demo
                </a>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div> //container end
  )
}