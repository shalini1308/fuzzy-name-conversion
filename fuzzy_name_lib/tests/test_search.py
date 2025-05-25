import unittest
from fuzzy_name_lib.search import search_name
import pandas as pd

class TestSearch(unittest.TestCase):
    def setUp(self):
        self.data = pd.DataFrame({'names': ['Ramesh', 'Suresh', 'Mahesh'], 'location': ['Delhi', 'Mumbai', 'Pune']})

    def test_search(self):
        result = search_name('Ramesh', self.data)
        self.assertGreater(len(result), 0)
        self.assertEqual(result[0]['name'], 'Ramesh')

if __name__ == '__main__':
    unittest.main()
