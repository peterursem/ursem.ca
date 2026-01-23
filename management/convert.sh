for F in *.jpg *.jpeg *.JPG; do
    if [ -f "$F" ]; then
        cwebp "$F" -o "$(basename "${F%.*}").webp"
    fi
done
