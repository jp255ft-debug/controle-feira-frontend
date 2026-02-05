# Gerar ícones PWA básicos
$icons = @(
    @{size=64; name="pwa-64x64.png"},
    @{size=192; name="pwa-192x192.png"},
    @{size=512; name="pwa-512x512.png"}
)

foreach ($icon in $icons) {
    # Criar imagem simples com PowerShell
    Add-Type -AssemblyName System.Drawing
    $bitmap = New-Object System.Drawing.Bitmap($icon.size, $icon.size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::FromArgb(255, 0, 120, 212))
    
    # Adicionar texto
    $font = New-Object System.Drawing.Font("Arial", ($icon.size/4), [System.Drawing.FontStyle]::Bold)
    $brush = [System.Drawing.Brushes]::White
    $graphics.DrawString("🛒", $font, $brush, ($icon.size/4), ($icon.size/3))
    
    $bitmap.Save($icon.name, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Ícone criado: $($icon.name)"
}
