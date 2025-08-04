// Web-compatible styles object
export const styles = {
  // Screen styles
  screen: {
    padding: '24px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  screenTV: {
    padding: '48px'
  },

  title: {
    fontSize: '28px',
    fontWeight: 'bold'
  },

  // Additional web-compatible styles
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxWidth: '400px',
    width: '100%'
  },

  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box'
  },

  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};
