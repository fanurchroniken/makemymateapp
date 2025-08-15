'use client'

import { quizSections } from '@/data/quiz-questions'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProgressBarProps {
  currentSection: string
  sectionProgress: {
    character: number
    appearance: number
    redflags: number
  }
  totalProgress: number
}

export function ProgressBar({ currentSection, sectionProgress, totalProgress }: ProgressBarProps) {
  const { t } = useLanguage()
  const sections = Object.keys(quizSections) as Array<keyof typeof quizSections>

  return (
    <div className="w-full space-y-4">
      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">{t('progress.overall')}</span>
          <span className="text-sm text-amber-400">{Math.round(totalProgress)}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Section Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sections.map((section) => {
          const isCurrent = currentSection === section
          const progress = sectionProgress[section]
          const sectionInfo = quizSections[section]

          return (
            <div
              key={section}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                isCurrent
                  ? 'border-amber-400 bg-slate-800/80 shadow-lg shadow-amber-500/20'
                  : 'border-slate-700 bg-slate-800/40'
              }`}
            >
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg">{sectionInfo.icon}</span>
                <div>
                  <h3 className={`text-sm font-medium ${
                    isCurrent ? 'text-amber-400' : 'text-white'
                  }`}>
                    {t(`section.${section}.title`)}
                  </h3>
                  <p className="text-xs text-slate-400">{t(`section.${section}.description`)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">{t('progress.section')}</span>
                  <span className={`text-xs font-medium ${
                    isCurrent ? 'text-amber-400' : 'text-slate-300'
                  }`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      isCurrent
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-slate-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
