"use client";
import { useState } from "react";

export default function GalleryGate({ galleries }:{ galleries: {id:string; title:string; accessCode:string}[] }){
  const [code, setCode] = useState("");
  const match = galleries.find(g=> g.accessCode.toLowerCase() === code.toLowerCase());
  return (
    <div className="grid gap-4 max-w-md mx-auto bg-white p-6 rounded-xl border">
      <h2 className="text-xl font-semibold">Accéder à une galerie</h2>
      <input placeholder="Code d’accès" className="border rounded-xl px-3 py-2" value={code} onChange={e=>setCode(e.target.value)} />
      <button disabled={!match} onClick={()=> alert(`Accès à ${match?.title}`)} className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50">
        Entrer
      </button>
    </div>
  );
}
