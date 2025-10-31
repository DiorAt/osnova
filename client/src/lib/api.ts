// API клиент для работы с бэкендом

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiError {
  error: string;
  errors?: Array<{ msg: string; param: string }>;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка запроса');
    }

    return data;
  }

  // Auth endpoints
  async sendSMSCode(phone: string) {
    return this.request<{ success: boolean; message: string; phone: string }>(
      '/auth/send-code',
      {
        method: 'POST',
        body: JSON.stringify({ phone }),
      }
    );
  }

  async verifyCode(phone: string, code: string) {
    return this.request<{
      success: boolean;
      requiresRegistration: boolean;
      token?: string;
      user?: any;
      phone?: string;
      message?: string;
    }>('/auth/verify-code', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    });
  }

  async register(data: {
    phone: string;
    code: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email?: string;
    age?: number;
    gender?: 'male' | 'female' | 'other';
  }) {
    return this.request<{ success: boolean; token: string; user: any }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  }

  // User endpoints
  async getProfile() {
    return this.request<any>('/users/profile');
  }

  async updateProfile(data: Partial<{
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    age: number;
    gender: 'male' | 'female' | 'other';
  }>) {
    return this.request<any>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAddresses() {
    return this.request<any[]>('/users/addresses');
  }

  async addAddress(data: {
    title: string;
    city: string;
    street: string;
    building: string;
    apartment?: string;
    postalCode?: string;
    isDefault?: boolean;
  }) {
    return this.request<any>('/users/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();

