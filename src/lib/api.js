// lightweight mock API + local persistence
import { openDB } from 'idb'

const DB_NAME = 'diglearners-db'
const DB_VERSION = 1

async function getDB(){
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db){
      if(!db.objectStoreNames.contains('lessons')) db.createObjectStore('lessons',{keyPath:'id'})
      if(!db.objectStoreNames.contains('progress')) db.createObjectStore('progress',{keyPath:'id',autoIncrement:true})
    }
  })
}

const seedLessons = async ()=>{
  const db = await getDB()
  const tx = db.transaction('lessons','readwrite')
  const store = tx.objectStore('lessons')
  const existing = await store.getAll()
  if(existing.length>0) return
  const data = [
    {id:'1',title:'Typing basics',moduleType:'typing',content:'<p>Practice typing: place your fingers on the home row.</p>'},
    {id:'2',title:'Safe browsing',moduleType:'safety',content:'<p>Learn how to browse safely.</p>'},
    {id:'3',title:'Block puzzles',moduleType:'coding',content:'<p>Drag blocks to create a sequence.</p>'}
  ]
  for(const l of data) await store.put(l)
  await tx.done
}

export async function fetchLessons(){
  const db = await getDB(); await seedLessons();
  return (await db.getAll('lessons')) || []
}

export async function fetchLessonById(id){
  const db = await getDB(); await seedLessons();
  return db.get('lessons',id)
}

export async function saveProgress(progress){
  const db = await getDB()
  const tx = db.transaction('progress','readwrite')
  await tx.objectStore('progress').add({...progress,createdAt:new Date().toISOString()})
  await tx.done
}

export async function getProgress(){
  const db = await getDB()
  return db.getAll('progress')
}
