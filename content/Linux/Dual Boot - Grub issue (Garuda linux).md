Suddenly I got kicked into grub rescue after a unintended windows update. Yes, Windows can crawl under your skin sometimes.

Secure Boot was Enabled automatically. First Disable it.

Then Live boot into same OS in this case Garuda linux using USB. 

Garuda linux filesystem is ==BTRFS==

## 1. Check your file partitions

```
lsblk -l
```

Check for root partition, and EFI partition. For me it was in /dev/nvme0n1p8 & /dev/nvme0n1p5 respectively.

## 2. Mount the BTRFS Root partition

```
sudo mount -o subvol=@ /dev/nvme0n1p8 /mnt
```

Check if the system files (`bin`, `etc`, `usr`, etc.) appear:

```
ls /mnt
```

## 3. Mount Other Btrfs Subvolumes

```
sudo mount -o subvol=@home /dev/nvme0n1p8 /mnt/home
sudo mount -o subvol=@log /dev/nvme0n1p8 /mnt/var/log
sudo mount -o subvol=@cache /dev/nvme0n1p8 /mnt/var/cache
```

## 4. Mount the EFI Partition

```
sudo mount --mkdir /dev/nvme0n1p5 /mnt/boot/efi
```

## 5. Bind System Directories

```
sudo mount -t proc /proc /mnt/proc
sudo mount --rbind /sys /mnt/sys
sudo mount --rbind /dev /mnt/dev
sudo mount --rbind /run /mnt/run
```

## 6. Chroot Into Your System

```
sudo arch-chroot
```

If this works, reinstall GRUB:

```
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

Exit and reboot:

```
exit
sudo umount -R /mnt
reboot
```

# Error you may encounter:

1. When running unmount command `sudo umount -R /mnt`

Error:
```
umount: /mnt/run/user/1000: target is busy.
```

This happens when some processes are still using `/mnt/run/user/1000`. You can try the following command to forcefully unmount it:

```
sudo umount -l /mnt
```

Now the unmount was successful, you can continue the steps.