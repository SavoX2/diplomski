import os

from skimage.io import imread, imsave
import numpy as np
from time import time

from gamma_correct import calculate_gamma, adjust_gamma, remove_outliers


def adjust_all_images(path, log_file):
    print("Poceo")

    total_time = 0
    f = open(log_file, "w")
    for root, dirs, files in os.walk(path):
        for file in files:
            print("---", file)
            start = time()

            adjust_single_image(root, file, f)

            total = time() - start
            f.write("Vrijeme potrebno za {}: {}s\n\n".format(file, total))

            total_time += total

    f.write("Ukupno vremena potrebno za sve slike: {}".format(total_time))

    print("Zavrsio")


def adjust_single_image(root, image_name, f):
    img = imread(os.path.join(root, image_name))

    r = img[:, :, 0] / 255
    g = img[:, :, 1] / 255
    b = img[:, :, 2] / 255

    L = np.ravel(0.2126 * r + 0.7152 * g + 0.0722 * b)  # pretvori u 1D niz

    gamma = calculate_gamma(remove_outliers(L, percentage=1), f=f)
    adjusted = adjust_gamma(img, gamma)

    imsave("./images/adjusted/" + image_name, adjusted)


adjust_all_images("./images/jpg/", "./drugi.log")
# adjust_single_image("./images/jpg/", "WaffleHouse.jpg")
