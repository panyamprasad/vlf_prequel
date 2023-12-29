export const environment = {
    production: false,
    isMockEnabled: false, // You have to switch this, when your real back-end is done
    apiUrl: 'https://demob2bapi.creditsnap.com/csb2b/',
    channel: 'web',
    institutionId: 'ABC',
    institutionConfig: {
      minLoanAmount: 5000
    },
    s3Images: 'https://s3.amazonaws.com/creditsnapimages/',
    client: {
        clientAppStatusURL: 'http://apply.ifs.hmc-qa.com/dashboard.php',
        secretKey: 'R-[5A3Y?r^t$U?Y*z\\G',
    },
    auth: {
        basic: 'Basic Y3NfdHJ1c3RlZF9jbGllbnQ6eHlzckdlN0dvdzJkZWZn',
        scope: 'read write trust',
        grantType: 'password',
        interceptorSkipHeader: 'X-Skip-Interceptor'
    }
};
