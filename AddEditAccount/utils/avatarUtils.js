export const handleAvatarChange = (e, setFunction) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setFunction((prev) => ({ ...prev, avatar: reader.result }))
    }
    reader.readAsDataURL(file)
  }
}

