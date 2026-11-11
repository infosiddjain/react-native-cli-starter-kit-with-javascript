// Creates .env, .env.development and .env.production from .env.example
// if they don't exist yet. Never overwrites your existing files.
// Runs automatically after `npm install`; run manually with `npm run setup:env`.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const examplePath = path.join(root, '.env.example');

if (!fs.existsSync(examplePath)) {
  process.exit(0);
}

const example = fs.readFileSync(examplePath, 'utf8');

const withOverrides = overrides =>
  example.replace(/^([A-Z0-9_]+)=.*$/gm, (line, key) =>
    key in overrides ? `${key}=${overrides[key]}` : line,
  );

const files = {
  '.env': example,
  '.env.development': withOverrides({ APP_ENV: 'development' }),
  '.env.production': withOverrides({
    APP_ENV: 'production',
    ENABLE_API_LOGS: 'false',
  }),
};

for (const [name, content] of Object.entries(files)) {
  const target = path.join(root, name);
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, content);
    console.log(`Created ${name} from .env.example`);
  }
}
