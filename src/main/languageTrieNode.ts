import {createTrieNode, setTrie} from '@smikhalevski/trie';

const languageMap = {
  'aar': 'aa',
  'abk': 'ab',
  'afr': 'af',
  'aka': 'ak',
  'amh': 'am',
  'ara': 'ar',
  'arg': 'an',
  'asm': 'as',
  'ava': 'av',
  'ave': 'ae',
  'aym': 'ay',
  'aze': 'az',
  'bak': 'ba',
  'bam': 'bm',
  'bel': 'be',
  'ben': 'bn',
  'bih': 'bh',
  'bis': 'bi',
  'bod': 'bo',
  'tib': 'bo',
  'bos': 'bs',
  'bre': 'br',
  'bul': 'bg',
  'cat': 'ca',
  'ces': 'cs',
  'cze': 'cs',
  'cha': 'ch',
  'che': 'ce',
  'chu': 'cu',
  'chv': 'cv',
  'cor': 'kw',
  'cos': 'co',
  'cre': 'cr',
  'cym': 'cy',
  'wel': 'cy',
  'dan': 'da',
  'deu': 'de',
  'ger': 'de',
  'div': 'dv',
  'dzo': 'dz',
  'ell': 'el',
  'gre': 'el',
  'eng': 'en',
  'epo': 'eo',
  'est': 'et',
  'eus': 'eu',
  'baq': 'eu',
  'ewe': 'ee',
  'fao': 'fo',
  'fas': 'fa',
  'per': 'fa',
  'fij': 'fj',
  'fin': 'fi',
  'fra': 'fr',
  'fre': 'fr',
  'fry': 'fy',
  'ful': 'ff',
  'gla': 'gd',
  'gle': 'ga',
  'glg': 'gl',
  'glv': 'gv',
  'grn': 'gn',
  'guj': 'gu',
  'hat': 'ht',
  'hau': 'ha',
  'heb': 'he',
  'her': 'hz',
  'hin': 'hi',
  'hmo': 'ho',
  'hrv': 'hr',
  'hun': 'hu',
  'hye': 'hy',
  'arm': 'hy',
  'ibo': 'ig',
  'ido': 'io',
  'iii': 'ii',
  'iku': 'iu',
  'ile': 'ie',
  'ina': 'ia',
  'ind': 'id',
  'ipk': 'ik',
  'isl': 'is',
  'ice': 'is',
  'ita': 'it',
  'jav': 'jv',
  'jpn': 'ja',
  'kal': 'kl',
  'kan': 'kn',
  'kas': 'ks',
  'kat': 'ka',
  'geo': 'ka',
  'kau': 'kr',
  'kaz': 'kk',
  'khm': 'km',
  'kik': 'ki',
  'kin': 'rw',
  'kir': 'ky',
  'kom': 'kv',
  'kon': 'kg',
  'kor': 'ko',
  'kua': 'kj',
  'kur': 'ku',
  'lao': 'lo',
  'lat': 'la',
  'lav': 'lv',
  'lim': 'li',
  'lin': 'ln',
  'lit': 'lt',
  'ltz': 'lb',
  'lub': 'lu',
  'lug': 'lg',
  'mah': 'mh',
  'mal': 'ml',
  'mar': 'mr',
  'mkd': 'mk',
  'mac': 'mk',
  'mlg': 'mg',
  'mlt': 'mt',
  'mon': 'mn',
  'mri': 'mi',
  'mao': 'mi',
  'msa': 'ms',
  'may': 'ms',
  'mya': 'my',
  'bur': 'my',
  'nau': 'na',
  'nav': 'nv',
  'nbl': 'nr',
  'nde': 'nd',
  'ndo': 'ng',
  'nep': 'ne',
  'nld': 'nl',
  'dut': 'nl',
  'nno': 'nn',
  'nob': 'nb',
  'nor': 'no',
  'nya': 'ny',
  'oci': 'oc',
  'oji': 'oj',
  'ori': 'or',
  'orm': 'om',
  'oss': 'os',
  'pan': 'pa',
  'pli': 'pi',
  'pol': 'pl',
  'por': 'pt',
  'pus': 'ps',
  'que': 'qu',
  'roh': 'rm',
  'ron': 'ro',
  'rum': 'ro',
  'run': 'rn',
  'rus': 'ru',
  'sag': 'sg',
  'san': 'sa',
  'sin': 'si',
  'slk': 'sk',
  'slo': 'sk',
  'slv': 'sl',
  'sme': 'se',
  'smo': 'sm',
  'sna': 'sn',
  'snd': 'sd',
  'som': 'so',
  'sot': 'st',
  'spa': 'es',
  'sqi': 'sq',
  'alb': 'sq',
  'srd': 'sc',
  'srp': 'sr',
  'ssw': 'ss',
  'sun': 'su',
  'swa': 'sw',
  'swe': 'sv',
  'tah': 'ty',
  'tam': 'ta',
  'tat': 'tt',
  'tel': 'te',
  'tgk': 'tg',
  'tgl': 'tl',
  'tha': 'th',
  'tir': 'ti',
  'ton': 'to',
  'tsn': 'tn',
  'tso': 'ts',
  'tuk': 'tk',
  'tur': 'tr',
  'twi': 'tw',
  'uig': 'ug',
  'ukr': 'uk',
  'urd': 'ur',
  'uzb': 'uz',
  'ven': 've',
  'vie': 'vi',
  'vol': 'vo',
  'wln': 'wa',
  'wol': 'wo',
  'xho': 'xh',
  'yid': 'yi',
  'yor': 'yo',
  'zha': 'za',
  'zho': 'zh',
  'chi': 'zh',
  'zul': 'zu',
};

/**
 * The trie root that maps language codes from ISO 639-X to ISO 639-1.
 */
export const languageTrieNode = createTrieNode<string>();

for (const [iso639x, iso6391] of Object.entries(languageMap)) {
  setTrie(languageTrieNode, iso639x, iso6391);
}
