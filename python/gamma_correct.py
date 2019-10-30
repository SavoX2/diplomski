from skimage.io import imread
import numpy as np
import cv2


def calculate_gamma(L, f):
    eps = np.finfo(float).eps

    Lmax = np.max(L)
    Lmin = np.min(L)
    logLmax = np.log(Lmax)
    logLmin = np.log(Lmin if Lmin > 0 else eps)
    f.write("Lmax = {} Lmin = {}\n".format(Lmax, Lmin))
    f.write("logLmax = {} logLmin = {}\n".format(logLmax, logLmin))

    Lavg = np.sum(L) / len(L)
    LH = np.exp(np.sum(np.log(L + eps)) / len(L))
    logLH = np.log(LH)
    f.write("Lavg = {} LH = {}\n".format(Lavg, LH))
    f.write("logLH = {}\n".format(logLH))

    k = (logLH - logLmin) / (logLmax - logLmin)
    f.write("k = {}\n".format(k))

    ov = [1 for i in (L * 255) if i >= 254]

    pov = len(ov) / len(L)
    f.write("pov = {}\n".format(pov))

    gamma = 2.4379 + 0.2319 * logLH - 1.1228 * k + 0.0085 * pov
    f.write("Gamma = {}\n".format(gamma))

    return gamma


def adjust_gamma(image, gamma=1.0):
    inv_gamma = 1.0 / gamma
    table = np.array(
        [((i / 255.0) ** inv_gamma) * 255 for i in np.arange(0, 256)]
    ).astype("uint8")

    return cv2.LUT(image, table)


def remove_outliers(L, percentage):
    L_sorted = np.sort(L)
    L_sorted_median = np.median(L_sorted)
    # apsolutna razlika medijana i vrijednosti niza
    L_diff_with_median = np.abs(L_sorted - L_sorted_median)
    # oni odzada ce biti najvise udaljeni od medijana
    sorted_indices = np.argsort(L_diff_with_median)

    # posljednih percentage% niza dobijenog argsort-om su oni najudaljeniji od medijana - outlier-i
    indices_to_delete = sorted_indices[
        -np.int(len(sorted_indices) * percentage / 100) :
    ]

    return np.delete(L_sorted, indices_to_delete)
