import fs from 'fs'
import path from 'path'

export interface AuthorProfile {
  name: string
  role: string
  bio: string
  academiaUrl?: string
  twitterUrl?: string
}

const profilesFile = path.join(process.cwd(), 'data/author-profiles.json')

export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getAllAuthorProfiles(): AuthorProfile[] {
  if (!fs.existsSync(profilesFile)) return []
  return JSON.parse(fs.readFileSync(profilesFile, 'utf8'))
}

export function getAuthorProfile(slug: string): AuthorProfile | null {
  const profiles = getAllAuthorProfiles()
  return profiles.find(p => nameToSlug(p.name) === slug) ?? null
}
