import React, { useState } from 'react';
import { Shield, AlertTriangle, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

export default function App() {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);

    const redFlags = [
        {
            pattern: /\b(synergy|leverage|paradigm|holistic|ecosystem|revolutionary)\b/i,
            flag: 'Buzzword Bingo',
            severity: 'high',
            fix: 'Use specific technical terms or plain language'
        },
        {
            pattern: /\b(we help|we enable|we empower)\b/i,
            flag: 'Generic Value Prop',
            severity: 'high',
            fix: 'Start with their specific context/signal'
        },
        {
            pattern: /\b(hope this finds you well|reaching out|wanted to touch base)\b/i,
            flag: 'Sales Template Language',
            severity: 'critical',
            fix: 'Open with a technical signal or observation'
        },
        {
            pattern: /\b(roi|increase revenue|save money|reduce costs)\b/i,
            flag: 'Business Speak to Engineers',
            severity: 'high',
            fix: 'Focus on architecture, latency, or technical debt'
        },
        {
            pattern: /\b(quick call|demo|free trial)\b/i,
            flag: 'Premature CTA',
            severity: 'medium',
            fix: 'Offer technical insights first, meeting later'
        },
        {
            pattern: /\b(our solution|our platform|our product)\b/i,
            flag: 'Product-First Pitch',
            severity: 'medium',
            fix: 'Lead with architecture fix, not product'
        },
        {
            pattern: /\b(best-in-class|industry-leading|award-winning)\b/i,
            flag: 'Self-Promotion',
            severity: 'medium',
            fix: 'Use peer testimonials or specific metrics'
        },
    ];

    const greenFlags = [
        {
            pattern: /\b(kubernetes|terraform|ci\/cd|microservices|observability|sre)\b/i,
            signal: 'Technical Vocabulary',
            boost: 15
        },
        {
            pattern: /\b(saw you|noticed|read your)\b/i,
            signal: 'Personal Research',
            boost: 20
        },
        {
            pattern: /\b(friction|bottleneck|pain|challenge|struggle)\b/i,
            signal: 'Pain Point Language',
            boost: 15
        },
        {
            pattern: /\b(usually means|typically indicates|often signals)\b/i,
            signal: 'Pattern Recognition',
            boost: 10
        },
        {
            pattern: /\b(architecture|infrastructure|stack|deployment)\b/i,
            signal: 'System-Level Thinking',
            boost: 15
        },
        {
            pattern: /\b(not pitching|no pressure|worth 15 minutes)\b/i,
            signal: 'Low-Pressure Approach',
            boost: 10
        },
    ];

    const analyzeMessage = () => {
        let score = 50;
        const detected = { red: [], green: [] };
        const wordCount = message.trim().split(/\s+/).length;

        redFlags.forEach(flag => {
            if (flag.pattern.test(message)) {
                detected.red.push(flag);
                const penalty = flag.severity === 'critical' ? 25 : flag.severity === 'high' ? 15 : 10;
                score = Math.max(0, score - penalty);
            }
        });

        greenFlags.forEach(flag => {
            if (flag.pattern.test(message)) {
                detected.green.push(flag);
                score = Math.min(100, score + flag.boost);
            }
        });

        // Length penalties
        if (wordCount > 150) {
            score = Math.max(0, score - 10);
            detected.red.push({
                flag: 'Too Long',
                severity: 'medium',
                fix: 'Engineers skim. Keep it under 100 words.'
            });
        }

        // Bonus for brevity with substance
        if (wordCount < 100 && detected.green.length > 2) {
            score = Math.min(100, score + 10);
        }

        const verdict = score >= 75 ? 'pass' : score >= 50 ? 'mixed' : 'fail';

        setResult({
            score,
            verdict,
            flags: detected,
            wordCount,
            recommendation: getRecommendation(verdict, detected)
        });
    };

    const getRecommendation = (verdict, flags) => {
        if (verdict === 'pass') {
            return 'This message has a high probability of getting a response. Technical signals detected, low BS factor.';
        } else if (verdict === 'mixed') {
            return 'Mixed signals. You have some good elements but some red flags are killing credibility. Focus on the fixes.';
        } else {
            return 'This will trigger the BS detector. Too salesy, not enough technical context. Rewrite using the fixes suggested.';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-2 mb-4">
                        <Shield className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">Basin Leon Tools</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                        Technical BS Detector
                    </h1>
                    <p className="text-slate-300 text-lg">
                        Test your outreach against the engineer BS filter before you hit send
                    </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 mb-6 shadow-2xl">
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                        Paste your outreach message
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={"Hi [Name],\n\nSaw you're hiring for a DevSecOps engineer. Usually that means you're hitting friction with compliance while trying to maintain deployment velocity...\n\n[Your message here]"}
                        className="w-full h-48 bg-slate-900/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    />
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-slate-400">
                            {message.trim().split(/\s+/).filter(w => w).length} words
                        </span>
                        <button
                            onClick={analyzeMessage}
                            disabled={!message.trim()}
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center gap-2 shadow-lg"
                        >
                            <Shield className="w-5 h-5" />
                            Run BS Detector
                        </button>
                    </div>
                </div>

                {result && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className={`rounded-2xl p-8 border-2 ${result.verdict === 'pass'
                                ? 'bg-emerald-500/10 border-emerald-500'
                                : result.verdict === 'mixed'
                                    ? 'bg-amber-500/10 border-amber-500'
                                    : 'bg-red-500/10 border-red-500'
                            }`}>
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-sm text-slate-300 mb-2">BS Detector Score</div>
                                    <div className="text-5xl font-bold">
                                        {result.score}<span className="text-2xl">/100</span>
                                    </div>
                                </div>
                                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${result.verdict === 'pass'
                                        ? 'bg-emerald-500/20'
                                        : result.verdict === 'mixed'
                                            ? 'bg-amber-500/20'
                                            : 'bg-red-500/20'
                                    }`}>
                                    {result.verdict === 'pass' ? (
                                        <ThumbsUp className="w-12 h-12 text-emerald-400" />
                                    ) : result.verdict === 'mixed' ? (
                                        <AlertTriangle className="w-12 h-12 text-amber-400" />
                                    ) : (
                                        <ThumbsDown className="w-12 h-12 text-red-400" />
                                    )}
                                </div>
                            </div>

                            <div className="text-lg font-medium mb-2 capitalize">
                                Verdict: {result.verdict === 'pass' ? 'Will Pass Filter' : result.verdict === 'mixed' ? 'Mixed Signals' : 'Will Trigger BS Detector'}
                            </div>
                            <div className="text-slate-300">{result.recommendation}</div>
                        </div>

                        {result.flags.red.length > 0 && (
                            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-400">
                                    <AlertTriangle className="w-5 h-5" />
                                    Red Flags Detected ({result.flags.red.length})
                                </h3>
                                <div className="space-y-4">
                                    {result.flags.red.map((flag, idx) => (
                                        <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-red-400">{flag.flag}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${flag.severity === 'critical'
                                                        ? 'bg-red-600 text-white'
                                                        : flag.severity === 'high'
                                                            ? 'bg-orange-600 text-white'
                                                            : 'bg-amber-600 text-white'
                                                    }`}>
                                                    {flag.severity}
                                                </span>
                                            </div>
                                            <div className="text-sm text-slate-300">
                                                <strong>Fix:</strong> {flag.fix}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {result.flags.green.length > 0 && (
                            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-emerald-400">
                                    <Sparkles className="w-5 h-5" />
                                    Green Flags Detected ({result.flags.green.length})
                                </h3>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {result.flags.green.map((flag, idx) => (
                                        <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                                            <div className="font-semibold text-emerald-400 text-sm mb-1">{flag.signal}</div>
                                            <div className="text-xs text-slate-400">+{flag.boost} points</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-5 text-sm">
                            <div className="font-semibold text-white mb-2">How the BS Detector Works</div>
                            <div className="text-slate-300 space-y-2">
                                <div>• <strong>Red Flags:</strong> Generic sales language, buzzwords, premature CTAs</div>
                                <div>• <strong>Green Flags:</strong> Technical vocabulary, personal research, pain point language</div>
                                <div>• <strong>Sweet Spot:</strong> 60-100 words, 2+ green flags, 0-1 red flags</div>
                            </div>
                        </div>
                    </div>
                )}

                <footer className="text-center mt-12 text-slate-500 text-sm">
                    <p>Built by <a href="https://basinleon.github.io" className="text-red-400 hover:text-red-300">Leon Basin</a> | <a href="https://github.com/BasinLeon/bs-detector" className="text-red-400 hover:text-red-300">View on GitHub</a></p>
                </footer>
            </div>
        </div>
    );
}
