import translate, { Language, Translation } from './translations'

export interface Subject {
  code: string
  category: string
  name: string
  comment?: string
}

type Parser = (translation: Translation, code: string) => Subject | null
const parseSubject: Parser = ({ subjects }, code) => {
  if (subjects == null || !subjects[code]) return null

  return {
    code,
    category: '',
    name: subjects[code] || (code as string),
  }
}

const parseTrainingSubject: Parser = (
  { categories, traningsskolaSubjects },
  code
) => {
  if (traningsskolaSubjects == null || !traningsskolaSubjects[code]) return null

  return {
    code,
    category: categories?.trainingSchool || categories?.unknown || '',
    name:
      traningsskolaSubjects != null && traningsskolaSubjects[code]
        ? traningsskolaSubjects[code]
        : (code as string),
  }
}

const parseLanguage: Parser = ({ categories, languages }, code) => {
  if (!code.startsWith('M1') && !code.startsWith('M2')) return null
  const category = `${
    categories?.modernLanguages || categories?.unknown || ''
  }, ${
    code.startsWith('M1')
      ? categories?.modernLanguagesA1 || categories?.unknown || ''
      : categories?.modernLanguagesA2 || categories?.unknown || ''
  }`
  const language = code.substr(2)

  return {
    code,
    category,
    name: (languages && languages[language]) || code,
  }
}

const parseAltLanguage: Parser = ({ categories, languages }, code) => {
  if (!code.startsWith('ASSV')) return null
  const language = code.substr(4)

  return {
    code,
    category: categories?.modernLanguagesAlt || categories?.unknown || '',
    name: (languages && languages[language]) || code,
  }
}

const parseNativeLanguage: Parser = ({ categories, languages }, code) => {
  if (!code.startsWith('ML')) return null
  const language = code.substr(2)

  return {
    code,
    category: categories?.motherTounge || categories?.unknown || '',
    name: (languages && languages[language]) || code,
  }
}

const parseMisc: Parser = ({ categories, misc }, code) => {
  if (misc == null || !misc[code]) return null

  return {
    code,
    category: categories?.misc || categories?.unknown || '',
    name: misc[code] as string,
  }
}

const parse = (code: string, lang: Language = 'sv'): Subject => {
  const translation = translate(lang)
  const [subjectCode, ...rest] = code.split(' ')
  const result: Subject = parseSubject(translation, subjectCode) ||
    parseTrainingSubject(translation, subjectCode) ||
    parseLanguage(translation, subjectCode) ||
    parseAltLanguage(translation, subjectCode) ||
    parseNativeLanguage(translation, subjectCode) ||
    parseMisc(translation, subjectCode) || {
      code: subjectCode,
      category: translation.categories?.unknown || '',
      name: subjectCode,
    }
  if (rest.length) result.comment = rest.join(' ').trim()
  return result
}

export default parse
