import html2canvas from 'html2canvas';

class ExportService {
  // Export card to PNG image
  public static async exportToPNG(elementId: string, filename = 'md2card-export.png'): Promise<string | null> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found:', elementId);
      return null;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true, // Allow cross-origin images
        backgroundColor: null, // Transparent background
        logging: false, // Disable logging
        onclone: (clonedDoc) => {
          // Ensure background images are loaded
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            clonedElement.style.width = element.offsetWidth + 'px';
            clonedElement.style.height = element.offsetHeight + 'px';
          }
        }
      });

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Create download link
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      link.click();

      return dataUrl;
    } catch (error) {
      console.error('Export failed:', error);
      return null;
    }
  }

  // Helper method to validate file name
  private static sanitizeFilename(name: string): string {
    return name
      .replace(/[^a-z0-9]/gi, '-') // Replace invalid characters with dash
      .replace(/-+/g, '-') // Replace multiple dashes with single dash
      .toLowerCase();
  }

  // Generate filename from title or current date
  public static generateFilename(title?: string): string {
    if (title) {
      const sanitized = this.sanitizeFilename(title);
      return `${sanitized}-${Date.now()}.png`;
    }
    
    const date = new Date();
    const timestamp = date.toISOString().split('T')[0];
    return `md2card-${timestamp}-${Date.now()}.png`;
  }

  // Check if an image URL is valid and can be loaded
  public static async isImageValid(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}

export default ExportService;
