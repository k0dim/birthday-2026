// Mock client for base44 integration
// Replace with actual base44 SDK in production

const base44 = {
  entities: {
    Guest: {
      create: async (data) => {
        console.log('Creating guest:', data)
        // Simulate API call
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, data })
          }, 1000)
        })
      }
    }
  },
  integrations: {
    Core: {
      SendEmail: async ({ to, subject, body }) => {
        console.log('Sending email:', { to, subject, body })
        // Simulate email sending
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true })
          }, 500)
        })
      }
    }
  }
}

export { base44 }