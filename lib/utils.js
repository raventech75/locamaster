// lib/utils.js

// ===== CONFIGURATION EMAIL =====
// Tu peux utiliser plusieurs services d'email

// Option 1: Nodemailer + Gmail (gratuit, simple)
import nodemailer from 'nodemailer'

// Option 2: SendGrid (professionnel, payant)
// import sgMail from '@sendgrid/mail'

// Option 3: Resend (moderne, simple)
// import { Resend } from 'resend'

// ===== EMAIL FUNCTIONS =====

export async function sendEmail({ to, subject, text, html }) {
  try {
    // OPTION 1: Nodemailer + Gmail
    if (process.env.EMAIL_PROVIDER === 'gmail') {
      return await sendWithNodemailer({ to, subject, text, html })
    }
    
    // OPTION 2: SendGrid
    if (process.env.EMAIL_PROVIDER === 'sendgrid') {
      return await sendWithSendGrid({ to, subject, text, html })
    }
    
    // OPTION 3: Resend
    if (process.env.EMAIL_PROVIDER === 'resend') {
      return await sendWithResend({ to, subject, text, html })
    }
    
    // Fallback: Nodemailer par défaut
    return await sendWithNodemailer({ to, subject, text, html })
    
  } catch (error) {
    console.error('Erreur envoi email:', error)
    throw new Error('Impossible d\'envoyer l\'email')
  }
}

// NODEMAILER + GMAIL (Configuration simple et gratuite)
async function sendWithNodemailer({ to, subject, text, html }) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // ton-email@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD // Mot de passe d'application Gmail
    }
  })

  const mailOptions = {
    from: `"LocaMaster DJ" <${process.env.GMAIL_USER}>`,
    to: to,
    subject: subject,
    text: text,
    html: html || text.replace(/\n/g, '<br>')
  }

  const result = await transporter.sendMail(mailOptions)
  console.log('Email envoyé:', result.messageId)
  return result
}

// SENDGRID (Service professionnel)
async function sendWithSendGrid({ to, subject, text, html }) {
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  const msg = {
    to: to,
    from: {
      email: process.env.FROM_EMAIL || 'support@locamaster-dj.com',
      name: 'LocaMaster DJ'
    },
    subject: subject,
    text: text,
    html: html || text.replace(/\n/g, '<br>')
  }

  // const result = await sgMail.send(msg)
  // return result
  
  // Placeholder pour l'instant
  console.log('SendGrid email simulated:', { to, subject })
  return { success: true }
}

// RESEND (Service moderne)
async function sendWithResend({ to, subject, text, html }) {
  // const resend = new Resend(process.env.RESEND_API_KEY)
  
  // const result = await resend.emails.send({
  //   from: 'LocaMaster DJ <support@locamaster-dj.com>',
  //   to: [to],
  //   subject: subject,
  //   text: text,
  //   html: html || text.replace(/\n/g, '<br>')
  // })
  
  // return result
  
  // Placeholder pour l'instant
  console.log('Resend email simulated:', { to, subject })
  return { success: true }
}

// ===== DATABASE FUNCTIONS =====

export async function saveToDatabase(table, data) {
  try {
    // OPTION 1: JSON File (simple, pour débuter)
    if (process.env.DB_PROVIDER === 'file' || !process.env.DB_PROVIDER) {
      return await saveToJSONFile(table, data)
    }
    
    // OPTION 2: MongoDB
    if (process.env.DB_PROVIDER === 'mongodb') {
      return await saveToMongoDB(table, data)
    }
    
    // OPTION 3: Supabase
    if (process.env.DB_PROVIDER === 'supabase') {
      return await saveToSupabase(table, data)
    }
    
    // OPTION 4: PlanetScale/MySQL
    if (process.env.DB_PROVIDER === 'mysql') {
      return await saveToMySQL(table, data)
    }
    
    // Fallback
    return await saveToJSONFile(table, data)
    
  } catch (error) {
    console.error('Erreur sauvegarde BDD:', error)
    throw new Error('Impossible de sauvegarder les données')
  }
}

// SAUVEGARDE JSON FILE (Simple, gratuit)
import fs from 'fs/promises'
import path from 'path'

async function saveToJSONFile(table, data) {
  const dataDir = path.join(process.cwd(), 'data')
  const filePath = path.join(dataDir, `${table}.json`)
  
  // Créer le dossier data s'il n'existe pas
  try {
    await fs.mkdir(dataDir, { recursive: true })
  } catch (error) {
    // Le dossier existe déjà
  }
  
  let existingData = []
  
  // Lire les données existantes
  try {
    const fileContent = await fs.readFile(filePath, 'utf8')
    existingData = JSON.parse(fileContent)
  } catch (error) {
    // Le fichier n'existe pas encore
    existingData = []
  }
  
  // Ajouter la nouvelle entrée avec un ID
  const newEntry = {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString()
  }
  
  existingData.push(newEntry)
  
  // Sauvegarder
  await fs.writeFile(filePath, JSON.stringify(existingData, null, 2))
  
  console.log(`Données sauvées dans ${filePath}`)
  return newEntry
}

// MONGODB (Base NoSQL populaire)
async function saveToMongoDB(table, data) {
  // const { MongoClient } = require('mongodb')
  // const client = new MongoClient(process.env.MONGODB_URI)
  
  // await client.connect()
  // const db = client.db('locamaster')
  // const collection = db.collection(table)
  
  // const result = await collection.insertOne({
  //   ...data,
  //   createdAt: new Date()
  // })
  
  // await client.close()
  // return result
  
  // Placeholder
  console.log('MongoDB save simulated:', table, data)
  return { insertedId: generateId() }
}

// SUPABASE (Firebase alternative)
async function saveToSupabase(table, data) {
  // const { createClient } = require('@supabase/supabase-js')
  // const supabase = createClient(
  //   process.env.SUPABASE_URL,
  //   process.env.SUPABASE_ANON_KEY
  // )
  
  // const { data: result, error } = await supabase
  //   .from(table)
  //   .insert([data])
  
  // if (error) throw error
  // return result
  
  // Placeholder
  console.log('Supabase save simulated:', table, data)
  return [{ id: generateId(), ...data }]
}

// MYSQL/PLANETSCALE (SQL classique)
async function saveToMySQL(table, data) {
  // const mysql = require('mysql2/promise')
  // const connection = await mysql.createConnection(process.env.DATABASE_URL)
  
  // const columns = Object.keys(data).join(', ')
  // const placeholders = Object.keys(data).map(() => '?').join(', ')
  // const values = Object.values(data)
  
  // const [result] = await connection.execute(
  //   `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`,
  //   values
  // )
  
  // await connection.end()
  // return result
  
  // Placeholder
  console.log('MySQL save simulated:', table, data)
  return { insertId: generateId() }
}

// ===== UTILITY FUNCTIONS =====

// Génération d'ID simple
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Validation email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Nettoyage des données
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Supprimer les scripts
    .replace(/[<>]/g, '') // Supprimer les balises HTML de base
}

// Rate limiting simple (en mémoire)
const rateLimitStore = new Map()

export function checkRateLimit(ip, windowMs = 15 * 60 * 1000, maxRequests = 5) {
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, [])
  }
  
  const requests = rateLimitStore.get(ip)
  
  // Supprimer les requêtes expirées
  const validRequests = requests.filter(timestamp => timestamp > windowStart)
  
  // Vérifier la limite
  if (validRequests.length >= maxRequests) {
    return false // Rate limit dépassé
  }
  
  // Ajouter la nouvelle requête
  validRequests.push(now)
  rateLimitStore.set(ip, validRequests)
  
  return true // OK
}

// Nettoyage périodique du rate limiting
setInterval(() => {
  const now = Date.now()
  for (const [ip, requests] of rateLimitStore) {
    const validRequests = requests.filter(timestamp => timestamp > now - 15 * 60 * 1000)
    if (validRequests.length === 0) {
      rateLimitStore.delete(ip)
    } else {
      rateLimitStore.set(ip, validRequests)
    }
  }
}, 5 * 60 * 1000) // Nettoyage toutes les 5 minutes