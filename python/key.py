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

L = np.ravel(0.2126 * r + 0.7152 * g + 0.0722 * b)  # pretvori u 1D niz

# print(img.shape, L.shape)

# In this equation Lmax and Lmin are the maximum and minimum luminance values,
# respectively, once a percentage of outlier pixels (both on the dark and bright sides) has been
# eliminated.
# We calculate two key values, k5 and k1, considering 5 % or 1 % of the pixels as outliers, respectively.
# Sta sad smatra kao outliere, da li su 5% najsvijetlijih i najtamnijih, tj. 2.5% najsvjetlijih i 2.5% najtamnijih?

L_sorted = np.sort(L)
L_sorted_median = np.median(L_sorted)
# print(L_sorted)
# print(L_sorted_median, L_sorted[len(L)//2])

def print_L_stats(L):
    print(len(L))
    Lmax = np.max(L)
    Lmin = np.min(L)
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

# print('Obicno L')
# print_L_stats(L)
# ovo je za slucaj da su outlieri po pola iznad i pola ispod mediana
# print('\n\nL odsjeceno gore i dole za 2.5%')
# print_L_stats([i for i in L_sorted[ np.int(len(L_sorted)*(2.5/100)) : np.int(len(L_sorted) - len(L_sorted)*(2.5/100)) ]])
# print('\n\nL odsjeceno gore i dole za 0.5%')
# print_L_stats([i for i in L_sorted[ np.int(len(L_sorted)*(0.5/100)) : np.int(len(L_sorted) - len(L_sorted)*(0.5/100)) ]])

def mySort(x):
    return L_sorted_median - x

# L_bla = L_sorted[]

print('Median', L_sorted_median)
print(sorted(L_sorted, key=mySort)[-50:-1])