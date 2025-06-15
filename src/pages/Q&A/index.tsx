import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import QACard from '../../components/Q&A/QACard'
import { hrQuestions, technicalQuestions, behavioralQuestions } from '../../components/Q&A/Q&AData'
import { BookOpen, MessageSquare, Info, Search, ArrowLeft, User, CheckCircle, Circle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Progress } from '../../components/ui/progress'
import { cn } from '../../lib/utils'
import Navbar from '../../components/common/Navbar'

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>('hr')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, Record<string, boolean>>>({
    hr: {},
    technical: {},
    behavioral: {},
  })

  const filterQuestions = (questions: any[]) => {
    if (!searchTerm) return questions
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const tabData = [
    { id: 'hr', label: 'HR Questions', icon: BookOpen, questions: hrQuestions },
    { id: 'technical', label: 'Technical Questions', icon: MessageSquare, questions: technicalQuestions },
    { id: 'behavioral', label: 'Behavioral Questions', icon: Info, questions: behavioralQuestions },
  ]

  const markAsCompleted = (tabId: string, questionId: string) => {
    setCompletedQuestions((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        [questionId]: true,
      },
    }))
  }

  const getCompletedCount = (tabId: string) => {
    return Object.values(completedQuestions[tabId]).filter(Boolean).length
  }

  const getProgressPercentage = (tabId: string) => {
    const currentTabQuestions = tabData.find((tab) => tab.id === tabId)?.questions || []
    const completedCount = getCompletedCount(tabId)
    return (completedCount / currentTabQuestions.length) * 100 || 0
  }

  // Generate a dynamic interactive progress indicator based on items length
  const renderProgressIndicators = (tabId: string) => {
    const questions = tabData.find((tab) => tab.id === tabId)?.questions || []

    // For large question sets, use segments instead of individual dots
    if (questions.length > 10) {
      const segmentCount = Math.min(7, questions.length)
      const segments = []

      for (let i = 0; i < segmentCount; i++) {
        // Calculate which questions this segment represents
        const startIdx = Math.floor((i * questions.length) / segmentCount)
        const endIdx = Math.floor(((i + 1) * questions.length) / segmentCount) - 1

        // Calculate how many questions in this segment are completed
        const questionsInSegment = questions.slice(startIdx, endIdx + 1)
        const completedInSegment = questionsInSegment.filter((q) => completedQuestions[tabId][q.id]).length
        const completionRatio = questionsInSegment.length > 0 ? completedInSegment / questionsInSegment.length : 0

        segments.push(
          <div
            key={`segment-${i}`}
            className="h-2 flex-1 mx-0.5 rounded-full overflow-hidden relative"
            title={`Questions ${startIdx + 1}-${endIdx + 1}: ${completedInSegment}/${
              questionsInSegment.length
            } completed`}
          >
            <div
              className={cn(
                'absolute inset-0 transition-all duration-300',
                completionRatio > 0.7
                  ? 'bg-edtech-common'
                  : completionRatio > 0.3
                  ? 'bg-edtech-common/70'
                  : completionRatio > 0
                  ? 'bg-edtech-common/30'
                  : 'bg-gray-200',
              )}
              style={{ width: `${Math.max(completionRatio * 100, 3)}%` }}
            >
              {completionRatio > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-effect"></div>
              )}
            </div>
          </div>,
        )
      }

      return <div className="flex w-full mt-1 gap-0.5">{segments}</div>
    }

    return questions.map((q, idx) => (
      <span
        key={q.id}
        className={cn(
          'w-4 h-4 rounded-full flex items-center justify-center text-xs border transition-all mx-0.5',
          completedQuestions[tabId][q.id]
            ? 'bg-edtech-common/10 border-edtech-common text-edtech-common'
            : 'bg-white border-gray-300 text-gray-600',
        )}
      >
        {completedQuestions[tabId][q.id] ? (
          <CheckCircle className="h-3 w-3" />
        ) : (
          <Circle className="h-3 w-3 text-gray-400" />
        )}
      </span>
    ))
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-edtech-dark/5 to-edtech-primary/5">
        <div className="fixed left-0 right-0 z-50 bg-white shadow-md py-3 px-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center"></div>
          </div>

          <div className="flex-1 mx-6 max-w-md">
            <div className="flex flex-col">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">Progress</span>
                <span className="font-medium">{getProgressPercentage(activeTab).toFixed(0)}%</span>
              </div>
              <Progress
                value={getProgressPercentage(activeTab)}
                className="h-3 bg-gray-100 rounded-full overflow-hidden"
              />
              <div className="flex justify-center mt-1">{renderProgressIndicators(activeTab)}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-edtech-common/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <div className="flex space-x-1">
                {Array.from({
                  length: Math.min(5, tabData.find((tab) => tab.id === activeTab)?.questions.length || 5),
                }).map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      idx <
                        Math.ceil(
                          (getCompletedCount(activeTab) /
                            (tabData.find((tab) => tab.id === activeTab)?.questions.length || 1)) *
                            5,
                        )
                        ? 'bg-edtech-common'
                        : 'bg-gray-300',
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-edtech-dark whitespace-nowrap">
                {getCompletedCount(activeTab)}/{tabData.find((tab) => tab.id === activeTab)?.questions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Add space to account for the fixed header */}
        <div className="h-24"></div>

        {/* Rest of the component remains largely the same */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-edtech-secondary max-w-2xl mx-auto">
              Explore common questions and detailed answers across various categories.
              <span className="font-medium text-edtech-common ml-1">Click on any question to reveal the answer!</span>
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search questions or answers..."
                className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Tabs
            defaultValue="hr"
            className="w-full max-w-4xl mx-auto"
            onValueChange={(value) => setActiveTab(value)}
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md border border-gray-100">
                {tabData.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-edtech-secondary data-[state=active]:to-edtech-dark data-[state=active]:text-white rounded-full px-6 py-2"
                  >
                    <tab.icon className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100">
              {tabData.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="mt-0 space-y-6 animate-fade-in"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-edtech-dark text-center w-full">
                      {tab.label}
                      <div className="h-1 w-20 bg-edtech-common mt-2 mx-auto rounded-full"></div>
                    </h2>
                  </div>

                  {filterQuestions(tab.questions).length > 0 ? (
                    filterQuestions(tab.questions).map((item, index) => (
                      <QACard
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        hint={item.hint}
                        index={index}
                        totalQuestions={filterQuestions(tab.questions).length}
                        completed={!!completedQuestions[tab.id][item.id]}
                        onComplete={() => markAsCompleted(tab.id, item.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No questions found matching your search.</p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSearchTerm('')}
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>

          <div className="text-center mt-16">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Skillbloom. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
