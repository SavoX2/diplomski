import time
from skimage.io import imread
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import skew
from scipy.stats import kurtosis
import imageio

img = imread('./images/URChapel.jpg')

# plt.figure()
# plt.imshow(img)
# plt.show(block=False)

r = img[:, :, 0] / 255
g = img[:, :, 1] / 255
b = img[:, :, 2] / 255

L = np.ravel(0.2126 * r + 0.7152 * g + 0.0722 * b)  # pretvori u 1D niz

# In this equation Lmax and Lmin are the maximum and minimum luminance values,
# respectively, once a percentage of outlier pixels (both on the dark and bright sides) has been
# eliminated.
# We calculate two key values, k5 and k1, considering 5 % or 1 % of the pixels as outliers, respectively.
# Sta sad smatra kao outliere, da li su 5% najsvijetlijih i najtamnijih, tj. 2.5% najsvjetlijih i 2.5% najtamnijih?

L_sorted = np.sort(L)
L_sorted_median = np.median(L_sorted)


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

    var = np.var(L)
    print('V_L =', var)

    std_dev = np.std(L)
    print('Standardna devijacija =', std_dev)

    skewness = skew(L)
    print('Skewness =', skewness)

    kurtosis_ = kurtosis(L)
    print('Kurtosis =', kurtosis_)

    start = time.time()
    temp = [ 1 for i in (L * 255) if i >= 254 ]
    print('Kraj {}'.format(time.time() - start))
    pov = np.sum(temp) / len(L)
    print('pov =', pov)

    gamma = 2.4379 + 0.2319 * logLH - 1.1228 * k + 0.0085 * pov
    print('Gamma =', gamma)


# print('Obicno L')
# print_L_stats(L)
# ovo je za slucaj da su outlieri po pola iznad i pola ispod mediana
# print('\n\nL odsjeceno gore i dole za 2.5%')
# print_L_stats([i for i in L_sorted[np.int(len(L_sorted)*(2.5/100)): np.int(len(L_sorted) - len(L_sorted)*(2.5/100))]])
print('\n\nL odsjeceno gore i dole za 0.5%')
print_L_stats([i for i in L_sorted[np.int(len(L_sorted)*(0.5/100)): np.int(len(L_sorted) - len(L_sorted)*(0.5/100))]])

# apsolutna razlika medijana i vrijednosti niza
L_diff_with_median = np.abs(L_sorted - np.median(L_sorted))
# oni odzada ce biti najvise udaljeni od medijana
sorted_indices = np.argsort(L_diff_with_median)

# print('\n\nL odsjeceno po udaljenosti 5%', -
#       np.int(len(sorted_indices) * 5 / 100))

# posljednih 5% niza dobijenog argsort-om su oni najudaljeniji od medijana - outlier-i
# indices_to_delete = sorted_indices[-np.int(len(sorted_indices) * 5 / 100):]
# print_L_stats(np.delete(L_sorted, indices_to_delete))

print('\n\nL odsjeceno po udaljenosti 1%', -
      np.int(len(sorted_indices) * 1 / 100))

# posljednih 1% niza dobijenog argsort-om su oni najudaljeniji od medijana - outlier-i
indices_to_delete = sorted_indices[-np.int(len(sorted_indices) * 1 / 100):]
print_L_stats(np.delete(L_sorted, indices_to_delete))

# https://www.pyimagesearch.com/2015/10/05/opencv-gamma-correction/