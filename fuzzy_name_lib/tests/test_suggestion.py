import unittest
from fuzzy_name_lib.suggestion import get_suggestions
import pandas as pd

class TestSuggestions(unittest.TestCase):
    def setUp(self):
        self.data = pd.DataFrame({'names': ['Ramesh', 'Suresh', 'Mahesh'], 'location': ['Delhi', 'Mumbai', 'Pune']})

    def test_suggestions(self):
        result = get_suggestions('Ramesh', self.data)
        self.assertGreater(len(result), 0)
        self.assertEqual(result[0]['name'], 'Ramesh')

if __name__ == '__main__':
    unittest.main()
