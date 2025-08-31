import { StyleSheet } from '@react-pdf/renderer';

// Estilos para o PDF
export const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 25,
    fontSize: 10,
    lineHeight: 1.4,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  clauseTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: 8,
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 15,
    marginBottom: 5,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
  },
  contractorInfo: {
    marginBottom: 6,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingTop: 30,
  },
  signatureBox: {
    width: '40%',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 5,
  },
  definitionItem: {
    marginBottom: 10,
  },
  contractorSection: {
    marginTop: 10,
    marginBottom: 15,
  },
});

// Estilos para o componente React
export const componentStyles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  headerTitle: {
    marginBottom: '10px',
    fontSize: '2.2rem',
  },
  headerSubtitle: {
    fontSize: '1.1rem',
    margin: 0,
  },
  buttonsSection: {
    textAlign: 'center' as const,
    marginBottom: '40px',
  },
  downloadButton: (loading: boolean) => ({
    padding: '18px 36px',
    backgroundColor: loading ? '#bdc3c7' : '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: loading ? ('not-allowed' as const) : ('pointer' as const),
    fontSize: '18px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: loading ? 'none' : '0 4px 15px rgba(52, 152, 219, 0.3)',
    transform: loading ? 'scale(0.98)' : 'scale(1)',
  }),
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    marginBottom: '30px',
  },
  featureCard: (borderColor: string) => ({
    backgroundColor: '#ecf0f1',
    padding: '25px',
    borderRadius: '12px',
    borderLeft: `5px solid ${borderColor}`,
  }),
  featureTitle: {
    color: '#2c3e50',
    marginTop: 0,
    marginBottom: '15px',
  },
  featureDescription: {
    color: '#34495e',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: 0,
  },
  warningBox: {
    backgroundColor: '#fff9e6',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid #f1c40f',
    textAlign: 'center' as const,
  },
  warningTitle: {
    color: '#d68910',
    fontSize: '16px',
  },
  warningText: {
    color: '#d68910',
    fontSize: '14px',
    margin: '10px 0 0 0',
  },
};
