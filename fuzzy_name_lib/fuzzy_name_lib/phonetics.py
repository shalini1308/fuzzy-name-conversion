from pyphonetics import Soundex

soundex = Soundex()

def get_phonetic_code(name):
    try:
        return soundex.phonetics(name)
    except Exception as e:
        print(f"Error generating phonetic code for {name}: {e}")
        return None
