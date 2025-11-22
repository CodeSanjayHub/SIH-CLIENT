import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Eye, 
  Download, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Lock,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'verified' | 'pending' | 'rejected';
}

const Documents = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Transgender_ID_Certificate.pdf',
      type: 'Transgender ID',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Aadhaar_Card_Copy.pdf',
      type: 'Aadhaar Card',
      size: '1.8 MB',
      uploadDate: '2024-01-15',
      status: 'verified'
    },
    {
      id: '3',
      name: 'Educational_Certificate.pdf',
      type: 'Educational Certificate',
      size: '3.2 MB',
      uploadDate: '2024-01-20',
      status: 'pending'
    }
  ]);

  const documentTypes = [
    { value: 'transgender-id', label: 'Transgender ID Certificate' },
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'educational', label: 'Educational Certificates' },
    { value: 'medical', label: 'Medical Records' },
    { value: 'employment', label: 'Employment Documents' },
    { value: 'other', label: 'Other Documents' }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload PDF, JPEG, or PNG files only.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newDocument: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: 'New Document',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'pending'
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      
      toast({
        title: "Upload Successful",
        description: "Your document has been uploaded and is pending verification.",
        variant: "default",
      });
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast({
      title: "Document Removed",
      description: "The document has been deleted successfully.",
      variant: "default",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-trust-light/20 to-primary-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gradient-primary mb-6">Document Management</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Securely upload, store, and manage your important documents. All files are encrypted and stored with the highest security standards.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Upload Section */}
        <Card className="empowerment-card p-8 mb-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-trust to-primary rounded-2xl flex items-center justify-center shadow-[var(--shadow-trust)]">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Upload New Document</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Upload your documents securely. Supported formats: PDF, JPEG, PNG (Max 10MB)
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer block"
              >
                {uploading ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 mx-auto border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-primary font-medium">Uploading...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-foreground font-medium">Click to upload document</p>
                      <p className="text-sm text-muted-foreground">or drag and drop</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mb-8 p-4 bg-trust-light/20 border border-trust-light rounded-xl">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-trust flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-trust mb-1">Secure Document Storage</h4>
              <p className="text-sm text-muted-foreground">
                All documents are encrypted end-to-end and stored on secure servers. Only you and authorized personnel can access your files.
              </p>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Documents</h2>
            <div className="text-sm text-muted-foreground">
              {documents.length} document{documents.length !== 1 ? 's' : ''} uploaded
            </div>
          </div>

          {documents.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Documents Yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload your first document to get started with secure document management.
              </p>
              <Button className="btn-primary">
                Upload Document
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {documents.map((document) => (
                <Card key={document.id} className="p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-muted to-muted/50 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{document.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{document.type}</span>
                          <span>•</span>
                          <span>{document.size}</span>
                          <span>•</span>
                          <span>Uploaded {document.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Status Badge */}
                      <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center space-x-1 ${getStatusColor(document.status)}`}>
                        {getStatusIcon(document.status)}
                        <span>{getStatusText(document.status)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="focus-ring"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="focus-ring"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive focus-ring"
                          onClick={() => handleDeleteDocument(document.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Document Types Info */}
        <Card className="mt-12 p-8">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Recommended Documents</h3>
            <p className="text-muted-foreground">
              Upload these documents to access all services and benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentTypes.map((type, index) => (
              <div key={index} className="p-4 border border-border rounded-xl hover:border-primary/50 transition-colors">
                <h4 className="font-medium mb-2">{type.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {type.value === 'transgender-id' && 'Official transgender identity certificate'}
                  {type.value === 'aadhaar' && 'Government issued Aadhaar card'}
                  {type.value === 'educational' && 'Academic qualifications and certifications'}
                  {type.value === 'medical' && 'Health records and medical certificates'}
                  {type.value === 'employment' && 'Work experience and employment documents'}
                  {type.value === 'other' && 'Additional supporting documents'}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Documents;