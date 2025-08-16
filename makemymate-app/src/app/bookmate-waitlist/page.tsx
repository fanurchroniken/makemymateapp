'use client'

import { useState, useEffect } from 'react'
import { Crown, BookOpen, Users, Heart, Sparkles, ArrowRight, CheckCircle, Mail, User, PenTool } from 'lucide-react'
import TopNav from '@/components/layout/TopNav'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

interface WaitlistForm {
  firstName: string
  lastName: string
  email: string
  role: 'reader' | 'author'
  consent: boolean
}

export default function BookmateWaitlistPage() {
  const { t } = useLanguage()
  const [form, setForm] = useState<WaitlistForm>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'reader',
    consent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stats, setStats] = useState({
    readers: 0,
    authors: 0,
    total: 0
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Fetch waitlist statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching waitlist stats...')
        const response = await fetch('/api/waitlist')
        console.log('Stats response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Stats data:', data)
          setStats(data.stats)
        } else {
          const errorData = await response.json()
          console.error('Stats error response:', errorData)
        }
      } catch (error) {
        console.error('Error fetching waitlist stats:', error)
      } finally {
        setIsLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  const handleInputChange = (field: keyof WaitlistForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!form.firstName.trim()) {
      newErrors.firstName = t('waitlist.validation.firstName')
    }
    
    if (!form.lastName.trim()) {
      newErrors.lastName = t('waitlist.validation.lastName')
    }
    
    if (!form.email.trim()) {
      newErrors.email = t('waitlist.validation.email')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('waitlist.validation.emailInvalid')
    }
    
    if (!form.consent) {
      newErrors.consent = t('waitlist.validation.consent')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    setErrors({})

    try {
      console.log('Submitting form data:', form)
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      console.log('Response status:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Success response:', result)
        
        setSubmitStatus('success')
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          role: 'reader',
          consent: false
        })
        
        // Refresh stats after successful submission
        const statsResponse = await fetch('/api/waitlist')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData.stats)
        }
      } else {
        let errorData
        try {
          errorData = await response.json()
          console.error('Error response:', errorData)
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError)
          errorData = {}
        }
        setErrorMessage(errorData.error || t('waitlist.form.error'))
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting waitlist:', error)
      setErrorMessage(t('waitlist.form.error'))
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
             {/* Animated Background */}
       <div className="absolute inset-0 -z-10">
         <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-purple-900/10" />
         <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
           <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
           <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-1000" />
           <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping delay-2000" />
           <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-3000" />
         </div>
       </div>

      {/* Sticky Header */}
      <TopNav />

             {/* Hero Section */}
       <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-cinzel gradient-text mb-6">
              {t('waitlist.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8">
              {t('waitlist.subtitle')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  {isLoadingStats ? (
                    <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    stats.readers.toLocaleString()
                  )}
                </div>
                <div className="text-slate-300">{t('waitlist.stats.readers')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {isLoadingStats ? (
                    <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    stats.authors.toLocaleString()
                  )}
                </div>
                <div className="text-slate-300">{t('waitlist.stats.authors')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-400 mb-2">
                  {isLoadingStats ? (
                    <div className="w-8 h-8 border-2 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  ) : (
                    stats.total.toLocaleString()
                  )}
                </div>
                <div className="text-slate-300">{t('waitlist.stats.total')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Vision Section */}
       <section className="py-16 bg-slate-900/30 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-cinzel gradient-text mb-6">
                {t('waitlist.vision.title')}
              </h2>
              
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                {t('waitlist.vision.description')}
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-amber-500/20">
              <h3 className="text-xl font-cinzel text-white mb-6 text-center">
                {t('waitlist.vision.features.title')}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Personalized Matching</h4>
                    <p className="text-slate-300 text-sm">{t('waitlist.vision.features.personalized')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Emotional Intelligence</h4>
                    <p className="text-slate-300 text-sm">{t('waitlist.vision.features.matching')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-rose-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Community Features</h4>
                    <p className="text-slate-300 text-sm">{t('waitlist.vision.features.community')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Author Insights</h4>
                    <p className="text-slate-300 text-sm">{t('waitlist.vision.features.insights')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 md:col-span-2">
                  <Crown className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Early Access</h4>
                    <p className="text-slate-300 text-sm">{t('waitlist.vision.features.early')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Waitlist Form */}
       <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel gradient-text mb-4">
                {t('waitlist.form.title')}
              </h2>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-8 border border-amber-500/20">
              {submitStatus === 'success' ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-16 h-16 text-amber-400 mx-auto" />
                  <h3 className="text-xl font-cinzel text-white">
                    {t('waitlist.form.success')}
                  </h3>
                  <Link href="/">
                    <button className="dark-glam-button">
                      {t('character.backToHome')}
                    </button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        {t('waitlist.form.firstName')}
                      </label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.firstName ? 'border-rose-400' : 'border-slate-600 focus:border-amber-400'
                        }`}
                        placeholder={t('waitlist.form.firstName')}
                      />
                      {errors.firstName && (
                        <p className="text-rose-400 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2">
                        {t('waitlist.form.lastName')}
                      </label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none transition-colors ${
                          errors.lastName ? 'border-rose-400' : 'border-slate-600 focus:border-amber-400'
                        }`}
                        placeholder={t('waitlist.form.lastName')}
                      />
                      {errors.lastName && (
                        <p className="text-rose-400 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('waitlist.form.email')}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 bg-slate-700 border rounded-lg text-white placeholder-slate-400 focus:outline-none transition-colors ${
                        errors.email ? 'border-rose-400' : 'border-slate-600 focus:border-amber-400'
                      }`}
                      placeholder={t('waitlist.form.email')}
                    />
                    {errors.email && (
                      <p className="text-rose-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      {t('waitlist.form.roleLabel')}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 p-4 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:border-amber-400 transition-colors">
                        <input
                          type="radio"
                          name="role"
                          value="reader"
                          checked={form.role === 'reader'}
                          onChange={(e) => handleInputChange('role', e.target.value as 'reader' | 'author')}
                          className="text-amber-400 focus:ring-amber-400"
                        />
                        <User className="w-5 h-5 text-amber-400" />
                        <span className="text-white">{t('waitlist.form.role.reader')}</span>
                      </label>
                      
                      <label className="flex items-center space-x-3 p-4 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                        <input
                          type="radio"
                          name="role"
                          value="author"
                          checked={form.role === 'author'}
                          onChange={(e) => handleInputChange('role', e.target.value as 'reader' | 'author')}
                          className="text-purple-400 focus:ring-purple-400"
                        />
                        <PenTool className="w-5 h-5 text-purple-400" />
                        <span className="text-white">{t('waitlist.form.role.author')}</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                      className="mt-1 text-amber-400 focus:ring-amber-400"
                    />
                    <label className="text-slate-300 text-sm leading-relaxed">
                      {t('waitlist.form.consent')}
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-rose-400 text-sm">{errors.consent}</p>
                  )}

                                     {submitStatus === 'error' && (
                     <div className="text-rose-400 text-center">
                       {errorMessage || t('waitlist.form.error')}
                     </div>
                   )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 px-6 rounded-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('waitlist.form.submitting')}</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Mail className="w-5 h-5" />
                        <span>{t('waitlist.form.submit')}</span>
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

             {/* Footer */}
       <footer className="border-t border-slate-700/50 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 gradient-text royal-glow" />
                             <span className="text-white font-cinzel">{t('footer.brandName')}</span>
            </div>
            <div className="flex space-x-6" />
          </div>
        </div>
      </footer>
    </div>
  )
}
