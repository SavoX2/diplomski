import imageio
import matplotlib.pyplot as plt

img = imageio.imread('./images/URChapel_GIMP.hdr')

plt.figure()
plt.imshow(img)
plt.show()

print(img)