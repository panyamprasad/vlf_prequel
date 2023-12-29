export const environment = {
    production: true,
    isMockEnabled: false, // You have to switch this, when your real back-end is done
    baseUrl: 'https://apply.peoplefund.org/pf',
    apiUrl: 'https://apply.peoplefund.org/pf',
    channel: 'web',
    institutionId: 'ABC',
    institutionConfig: {
        minLoanAmount: 5000
    },
    s3Images: 'https://s3.amazonaws.com/creditsnapimages/',
    client: {
        clientAppStatusURL: 'https://secure.ifs4u.com/dashboard.php',
        secretKey: '[Zp/{6R5&,C>M/md#\\a(',
    },
    auth: {
        basic: 'Basic Y3NfdHJ1c3RlZF9jbGllbnRfcHJvZDpqM3JYSkE2UEx5SkVNSm1N',
        scope: 'read write trust',
        grantType: 'password',
        interceptorSkipHeader: 'X-Skip-Interceptor'
    }
};
