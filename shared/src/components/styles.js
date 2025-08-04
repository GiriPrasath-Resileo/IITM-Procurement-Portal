import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    form: {
        width: '100%',
        maxWidth: 500,
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        elevation: 5
    },
    formTV: {
        maxWidth: 800,
        padding: 48
    },
    header: {
        alignItems: 'center',
        marginBottom: 32
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#333',
        textAlign: 'center'
    },
    titleTV: {
        fontSize: 42
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
        textAlign: 'center'
    },
    inputGroup: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#444'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fafafa'
    },
    inputError: {
        borderColor: '#ff4d4f'
    },
    icon: {
        marginRight: 12
    },
    input: {
        flex: 1,
        height: 56,
        fontSize: 16,
        color: '#333'
    },
    inputTV: {
        height: 72,
        fontSize: 24
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
    button: {
        backgroundColor: '#6200ea',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        boxShadow: '0 4px 8px rgba(98, 0, 234, 0.2)',
        elevation: 3
    },
    buttonTV: {
        paddingVertical: 24
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    buttonDisabled: {
        opacity: 0.7
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    footer: {
        marginTop: 24,
        alignItems: 'center'
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center'
    },
    linkText: {
        color: '#6200ea',
        fontWeight: '500',
        textDecorationLine: 'underline'
    }
});
