from googletrans import Translator

def translate_input(input_text):
    translator = Translator()
    try:
        if input_text.isascii():  # English to Hindi
            return translator.translate(input_text, src='en', dest='hi').text
        else:  # Hindi to English
            return translator.translate(input_text, src='hi', dest='en').text
    except Exception as e:
        print(f"Translation error: {e}")
        return input_text  # Fallback
