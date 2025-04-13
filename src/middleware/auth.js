// contoh middleware sederhana
app.use((req, res, next) => {
    req.user = { role: "admin" }; // pakai ini buat testing
    next();
  });