from skimage.io import imread
import numpy as np
import matplotlib.pyplot as plt

img = imread('./images/URChapel.jpg')

# plt.figure()
# plt.imshow(img)
# plt.show(block=False)

r = img[:, :, 0] / 255
g = img[:, :, 1] / 255
b = img[:, :, 2] / 255

L = np.ravel(0.2126 * r + 0.7152 * g + 0.0722 * b) # pretvori u 1D niz

print(img.shape, L.shape)

# We calculate two key values, k5 and k1, considering 5 % or 1 % of the pixels as outliers, respectively.
# Sta sad smatra kao outliere, da li su 5% najsvijetlijih i najtamnijih, tj. 2.5% najsvjetlijih i 2.5% najtamnijih?

Lmax = np.max(L)
Lmin = np.min(L)
L5 
logLmax = np.log(Lmax)
logLmin = np.log(Lmin)
print('Lmax =', Lmax, 'Lmin =', Lmin)
print('logLmax =', logLmax, 'logLmin =', logLmin)

Lavg = np.sum(L) / len(L)
eps = np.finfo(float).eps
LH = np.exp(np.sum(np.log(L + eps)) / len(L))
logLH = np.log(LH)
print('Lavg =', Lavg, 'LH =', LH)
print('logLH =', logLH)

k = (logLH - logLmin) / (logLmax - logLmin)
print('k =', k)