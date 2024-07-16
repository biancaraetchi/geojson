import re

def extract_floats(s):
    pattern = r"[-+]?\d*\.\d+"
    return re.findall(pattern, s)