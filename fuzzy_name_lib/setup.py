from setuptools import setup, find_packages

setup(
    name='fuzzy_name_lib',
    version='0.1.0',
    description='A library for fuzzy name matching and phonetic search',
    author='Your Name',
    packages=find_packages(),
    install_requires=[
        'pandas',
        'googletrans',
        'rapidfuzz',
        'sqlalchemy',
        'pyphonetics',
        'Flask',
        'flask-cors'
    ],
)
