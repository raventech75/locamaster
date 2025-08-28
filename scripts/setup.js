#!/usr/bin/env node

// scripts/setup.js - Script de configuration automatique
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log('🎧 Configuration LocaMaster DJ\n')

async function setup() {
  try {
    // Créer les dossiers nécessaires
    const directories = ['components', 'lib', 'data', 'scripts']
    for (const dir of directories) {
      const dirPath = path.join(process.cwd(), dir)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
        console.log(`✅ Dossier ${dir} créé`)
      }
    }

    // Configuration email
    console.log('\n📧 Configuration Email:')
    const emailProvider = await askQuestion('Provider email (gmail/sendgrid/resend): ')
    let emailConfig = `EMAIL_PROVIDER=${emailProvider}\n`

    if (emailProvider === 'gmail') {
      const gmailUser = await askQuestion('Adresse Gmail: ')
      const gmailPass = await askQuestion('Mot de passe d\'application Gmail: ', true)
      emailConfig += `GMAIL_USER=${gmailUser}\n`
      emailConfig += `GMAIL_APP_PASSWORD=${gmailPass}\n`
    }

    const adminEmail = await askQuestion('Email admin pour recevoir les demandes: ')
    emailConfig += `ADMIN_EMAIL=${adminEmail}\n`

    // Configuration base de données
    console.log('\n💾 Configuration Base de données:')
    const dbProvider = await askQuestion('Provider BDD (file/mongodb/supabase/mysql): ')
    let dbConfig = `DB_PROVIDER=${dbProvider}\n`

    // Générer le fichier .env.local
    const envContent = `# Configuration générée automatiquement
# ${new Date().toLocaleString()}

${emailConfig}
${dbConfig}
NEXTAUTH_SECRET=${generateSecret()}
NEXTAUTH_URL=http://localhost:3000
`

    fs.writeFileSync('.env.local', envContent)
    console.log('\n✅ Fichier .env.local créé')

    // Instructions finales
    console.log(`
🚀 Configuration terminée !

Prochaines étapes:
1. npm install
2. npm run dev
3. Ouvre http://localhost:3000

📧 Configuration email:
${emailProvider === 'gmail' ? `
- Va dans ton compte Google
- Active l'authentification à 2 facteurs
- Génère un "mot de passe d'application"
- Utilise ce mot de passe dans GMAIL_APP_PASSWORD
` : '- Configure ton service email selon la documentation'}

💡 Le système sauvegarde actuellement dans des fichiers JSON.
   Pour la production, considère MongoDB/Supabase.

📁 Tes données seront dans le dossier ./data/
`)

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error)
  } finally {
    rl.close()
  }
}

function askQuestion(question, hideInput = false) {
  return new Promise((resolve) => {
    if (hideInput) {
      // Pour les mots de passe, on masque l'entrée
      process.stdout.write(question + ' ')
      process.stdin.setRawMode(true)
      process.stdin.resume()
      
      let input = ''
      process.stdin.on('data', (char) => {
        char = char.toString()
        
        if (char === '\n' || char === '\r' || char === '\u0004') {
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\n')
          resolve(input)
        } else if (char === '\u0003') {
          // Ctrl+C
          process.exit()
        } else if (char === '\u007f') {
          // Backspace
          if (input.length > 0) {
            input = input.slice(0, -1)
            process.stdout.write('\b \b')
          }
        } else {
          input += char
          process.stdout.write('*')
        }
      })
    } else {
      rl.question(question + ' ', resolve)
    }
  })
}

function generateSecret() {
  return require('crypto').randomBytes(32).toString('hex')
}

// Lancer la configuration
setup()