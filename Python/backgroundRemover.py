import cv2
import numpy as np
from skimage import exposure
from skimage import io
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from scipy import ndimage
from skimage import io, color, exposure
import os
import random
import string
import sys
src = sys.argv[1]
img = io.imread(src)
# Load the image

# Compute the background using a median filter
background = cv2.medianBlur(img, 51)

# Subtract the background from the image
subtracted = cv2.absdiff(img, background)

# Rescale the image for visualization
subtracted_scaled = cv2.normalize(subtracted, None, 0, 255, cv2.NORM_MINMAX, dtype=cv2.CV_8U)
filekey=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
path='/home/tarsh/Desktop/PR Backend/Files/'+filekey+'.png'
userPath=path[3:]
userPath=userPath.replace("/","|")
print(filekey+'.png')
# Save the result to a new PNG file
cv2.imwrite(path,subtracted_scaled)