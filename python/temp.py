import imageio
import matplotlib.pyplot as plt
import numpy as np
import cv2
from skimage.io import imread

img = cv2.imread("./images/URChapel.jpg")


def adjust_gamma(image, gamma=1.0):
    # build a lookup table mapping the pixel values [0, 255] to
    # their adjusted gamma values
    invGamma = 1.0 / gamma
    table = np.array(
        [((i / 255.0) ** invGamma) * 255 for i in np.arange(0, 256)]
    ).astype("uint8")

    # apply gamma correction using the lookup table
    return cv2.LUT(image, table)

plt.figure()
plt.imshow(img)
plt.show(block=False)

gamma = 2
adjusted = adjust_gamma(img, gamma=gamma)
cv2.putText(
    adjusted,
    "g={}".format(gamma),
    (10, 30),
    cv2.FONT_HERSHEY_SIMPLEX,
    0.8,
    (0, 0, 255),
    3,
)
cv2.imshow("Images", np.hstack([img, adjusted]))
cv2.waitKey(0)

# print(img)
