from rapidfuzz import fuzz
from .translation import translate_input
from .phonetics import get_phonetic_code

def search_name(input_name, dataframe):
    input_name = input_name.strip().lower()
    translated_name = translate_input(input_name).lower()
    input_phonetic = get_phonetic_code(input_name)
    results = []

    for _, row in dataframe.iterrows():
        name = row['names'].lower()
        name_phonetic = get_phonetic_code(name)
        confidence = max(
            fuzz.partial_ratio(input_name, name),
            fuzz.partial_ratio(translated_name, name)
        )
        if confidence > 60 or (input_phonetic and name_phonetic and input_phonetic == name_phonetic):
            results.append({
                'name': row['names'],
                'location': row.get('location', 'N/A'),
                'confidence': confidence,
            })
    return sorted(results, key=lambda x: x['confidence'], reverse=True)
