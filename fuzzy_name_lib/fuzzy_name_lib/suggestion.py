from rapidfuzz import fuzz
from .translation import translate_input
from .phonetics import get_phonetic_code

def get_suggestions(input_text, dataframe, limit=10):
    input_text = input_text.strip().lower()
    translated_text = translate_input(input_text).lower()
    input_phonetic = get_phonetic_code(input_text)
    suggestions = []

    for _, row in dataframe.iterrows():
        name = row['names'].lower()
        name_phonetic = get_phonetic_code(name)

        if input_text in name or translated_text in name:
            suggestions.append({
                'name': row['names'],
                'location': row.get('location', 'N/A'),
            })
        elif (
            fuzz.partial_ratio(input_text, name) > 60 or 
            fuzz.partial_ratio(translated_text, name) > 60 or
            (input_phonetic and name_phonetic and input_phonetic == name_phonetic)
        ):
            suggestions.append({
                'name': row['names'],
                'location': row.get('location', 'N/A'),
            })
    return sorted(suggestions, key=lambda x: fuzz.partial_ratio(input_text, x['name'].lower()), reverse=True)[:limit]
