'use client'
import { useState, useEffect } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const outlineData = {"chapters":[{"chapterNumber":0,"title":"Preface","sections":[{"level":1,"heading":"Preface","bibleReferences":[],"subsections":[]}]},{"chapterNumber":1,"title":"Chapter 1: Biblical Theology and Systematic Theology in Covenant Theology","sections":[{"level":2,"heading":"Introduction","bibleReferences":["Romans 11:33","Romans 11:36","Proverbs 24:27"],"subsections":[]},{"level":2,"heading":"1. Scope and Simplicity","bibleReferences":[],"subsections":[]},{"level":2,"heading":"2. Creation, Covenant, and Consequences","bibleReferences":["Luke 17:10","Acts 17:24–25","Job 35:5–8","Job 41:11","Romans 2:14–15","Hebrews 9:10","1 Corinthians 7:19","Philippians 4:8–9","Romans 4:11"],"subsections":[]},{"level":2,"heading":"3. The Law and the Gospel","bibleReferences":["Romans 11:6","Ephesians 2:8","Galatians 3:2","Genesis 3:15"],"subsections":[]},{"level":2,"heading":"4. History and Mystery","bibleReferences":["Ephesians 3:4","Colossians 4:3","Colossians 1:25","Colossians 1:25–27","Ephesians 3:4–12","Romans 16:25–26","Ephesians 1:9–10","Acts 1:6","Colossians 4:3–4","Luke 24:25–27","Acts 28:23"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Romans 11:33–36"],"subsections":[]}]},{"chapterNumber":2,"title":"Chapter 2: Typology","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. What is Typology?","bibleReferences":[],"subsections":[]},{"level":2,"heading":"2. The Relation between a Type and its Antitype","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Types reveal something greater, and other, than themselves.","bibleReferences":["John 6:32–33","1 Corinthians 10:4","Colossians 2:17","Hebrews 8:5","Hebrews 9:23–24","Hebrews 10:1"],"subsections":[]},{"level":2,"heading":"b. Types function on two levels.","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. Types terminate in their antitypes.","bibleReferences":[],"subsections":[]},{"level":2,"heading":"d. Types are positive and negative.","bibleReferences":["Jeremiah 31:31–32","Hebrews 10:1"],"subsections":[]},{"level":2,"heading":"3. The Application of Typological Principles","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":3,"title":"Chapter 3: Covenant and Kingdom","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The definition of a covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"b. Covenant sanctions","bibleReferences":["Jeremiah 34:18–20","Psalm 50:5","1 Samuel 20:12–16","1 Samuel 20:16","Genesis 15:9–10","Hebrews 9:16–17"],"subsections":[]},{"level":2,"heading":"c. The matter and form of a covenant","bibleReferences":["Romans 11:6","Romans 4:4–5","Galatians 3:18","Genesis 17:14","Exodus 24:7–8"],"subsections":[]},{"level":2,"heading":"d. Federal headship","bibleReferences":["Hebrews 7:9–10","Matthew 3:9"],"subsections":[]},{"level":2,"heading":"2. What is a Covenant's Function?","bibleReferences":["Psalm 24:1–2","Psalm 33:13–15","Daniel 4:34–35","Ephesians 1:9–10"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":4,"title":"Chapter 4: The Covenant of Works","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. Man's Created Condition","bibleReferences":["Genesis 1:31"],"subsections":[]},{"level":2,"heading":"2. Man's Covenantal Condition","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. God placed Adam in the garden of Eden","bibleReferences":["Genesis 2:8","Genesis 2:9","Genesis 2:15","Hebrews 12:22","Exodus 25:31–39"],"subsections":[]},{"level":2,"heading":"b. God appointed Adam federal head over his natural offspring","bibleReferences":["Romans 5:19","1 Corinthians 15:22","Genesis 1:28"],"subsections":[]},{"level":2,"heading":"c. God obligated Adam to a law of obedience","bibleReferences":["Genesis 2:15","Genesis 2:16–17","Numbers 3:5–10"],"subsections":[]},{"level":2,"heading":"d. God promised eternal life to Adam","bibleReferences":["Revelation 2:7","Genesis 3:22–24","Romans 3:23","Hebrews 2:10"],"subsections":[]},{"level":2,"heading":"e. God threatened Adam with sanctions","bibleReferences":["Genesis 2:17"],"subsections":[]},{"level":2,"heading":"f. God made a Covenant of Works with Adam","bibleReferences":[],"subsections":[]},{"level":2,"heading":"g. God tested Adam's obedience","bibleReferences":["Romans 3:23","Romans 5:17–18"],"subsections":[]},{"level":2,"heading":"3. Man's Cursed Condition","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Death","bibleReferences":["Romans 5:12","1 Corinthians 15:21–22","Ephesians 2:1–3","Ephesians 4:18","1 Corinthians 2:14","Matthew 7:17–18","Romans 5:6","Titus 3:3","Genesis 3:22"],"subsections":[]},{"level":2,"heading":"b. The abrogation of the covenant of works","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. A merciful curse","bibleReferences":["Genesis 3:15"],"subsections":[]},{"level":2,"heading":"4. The Protological Nature of the Kingdom","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":5,"title":"Chapter 5: The Noahic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. A New Creation and Commission","bibleReferences":["Genesis 8:21","Genesis 9:1–2"],"subsections":[]},{"level":2,"heading":"2. A Judicial Retribution","bibleReferences":["Genesis 9:5–7"],"subsections":[]},{"level":2,"heading":"3. A Promised Preservation","bibleReferences":["Genesis 9:8–17","Genesis 8:22"],"subsections":[]},{"level":2,"heading":"4. A Common Cursed Kingdom of Common Grace","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":6,"title":"Chapter 6: The Abrahamic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Initiation of the Covenant","bibleReferences":["Genesis 12:1–7"],"subsections":[]},{"level":2,"heading":"a. The federal head","bibleReferences":["Genesis 12:2"],"subsections":[]},{"level":2,"heading":"b. The inheritance of Canaan","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. The blessing for the nations","bibleReferences":["Ephesians 1:10"],"subsections":[]},{"level":2,"heading":"2. The Confirmation of the Covenant","bibleReferences":["Genesis 15:18"],"subsections":[]},{"level":2,"heading":"3. The Expansion of the Covenant","bibleReferences":["Genesis 15:18","Genesis 12:7","Genesis 17:4–8","Genesis 17:6","Genesis 35:11","Genesis 49:8–10","Genesis 17:9","Genesis 17:14"],"subsections":[]},{"level":2,"heading":"4. The Realization of the Covenant","bibleReferences":["Joshua 21:43–45","Nehemiah 9:7–8","1 Kings 4:20","Hebrews 11:12","Luke 1:54–55","Luke 1:68"],"subsections":[]},{"level":2,"heading":"5. The Foundation of the Old Covenant","bibleReferences":["Genesis 28:4","Genesis 35:12","Exodus 6:2–4","Exodus 32:13","Deuteronomy 1:8","Joshua 1:6","Psalm 105:6–11","Jeremiah 11:2–5","Romans 11:1","Acts 3:25–26","Acts 7:2–3","Luke 3:8–9"],"subsections":[]},{"level":2,"heading":"a. The Abrahamic Covenant anticipates the Mosaic Covenant","bibleReferences":["Genesis 15:13"],"subsections":[]},{"level":2,"heading":"b. The Abrahamic covenant anticipates the Davidic Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. The Abrahamic Covenant anticipates the New Covenant","bibleReferences":["Romans 4:10","Hebrews 11:9–10"],"subsections":[]},{"level":2,"heading":"d. The Abrahamic covenant echoes Eden","bibleReferences":[],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":7,"title":"Chapter 7: The Mosaic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The promise of oppression and affliction","bibleReferences":["Genesis 15:13–16","Exodus 2:23–25","Exodus 12:40–41"],"subsections":[]},{"level":2,"heading":"b. The promise of liberation and fulfilment","bibleReferences":["Exodus 3:13–17","Exodus 6:1–5","Psalm 77:20"],"subsections":[]},{"level":2,"heading":"2. The Kind of Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Its laws","bibleReferences":["Exodus 19:3–8","Exodus 24:3–8","Hebrews 9:18–23","Exodus 34:27–28"],"subsections":[]},{"level":2,"heading":"b. Its promises","bibleReferences":["Jeremiah 11:2–5","Jeremiah 7:3–7","Exodus 32:13"],"subsections":[]},{"level":2,"heading":"c. Its threats","bibleReferences":["Deuteronomy 6:20","Deuteronomy 11:26–28","Deuteronomy 27:26","Deuteronomy 29:22–28","Deuteronomy 30:15–20"],"subsections":[]},{"level":2,"heading":"3. The Kindness of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The absolute dominion of God","bibleReferences":[],"subsections":[]},{"level":2,"heading":"b. The promises to Abraham","bibleReferences":["Exodus 32:13–14"],"subsections":[]},{"level":2,"heading":"c. The sacrificial system","bibleReferences":["Leviticus 5:14–19","Leviticus 16:21–22"],"subsections":[]},{"level":2,"heading":"d. The history of Israel","bibleReferences":["Deuteronomy 4:25–31","Nehemiah 9:7–8"],"subsections":[]},{"level":2,"heading":"4. The Function of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The covenant governs the people","bibleReferences":["Deuteronomy 4:1–2"],"subsections":[]},{"level":2,"heading":"b. The covenant governs the priesthood","bibleReferences":["Exodus 40:12–16","Leviticus 10:1–2"],"subsections":[]},{"level":2,"heading":"c. The covenant governs the kingship","bibleReferences":["Deuteronomy 17:14–20"],"subsections":[]},{"level":2,"heading":"d. The covenant governs the prophets","bibleReferences":["Numbers 12:6","Deuteronomy 13:1–5"],"subsections":[]},{"level":2,"heading":"e. The covenant governs blessing and cursing","bibleReferences":["Deuteronomy 27:9–10","Deuteronomy 28:1–2","Deuteronomy 31:9–13","Deuteronomy 32:45–47"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Hebrews 10:1"],"subsections":[]}]},{"chapterNumber":8,"title":"Chapter 8: The Davidic Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The promises of the Abrahamic Covenant","bibleReferences":["Genesis 17:6"],"subsections":[]},{"level":2,"heading":"b. The problems of the Mosaic Covenant","bibleReferences":["Judges 2:10–11","Judges 21:25"],"subsections":[]},{"level":2,"heading":"c. The preference of the people","bibleReferences":["1 Samuel 8:7–9"],"subsections":[]},{"level":2,"heading":"d. The prospect of consummation","bibleReferences":["Deuteronomy 12:8–12"],"subsections":[]},{"level":2,"heading":"2. The Blessings of the Covenant","bibleReferences":["2 Samuel 7:8–16"],"subsections":[]},{"level":2,"heading":"a. An established throne","bibleReferences":[],"subsections":[]},{"level":2,"heading":"b. Rest and prosperity in Canaan","bibleReferences":["1 Kings 8:56","Psalm 144:1–2"],"subsections":[]},{"level":2,"heading":"c. The presence and protection of God","bibleReferences":["1 Kings 6:12–13"],"subsections":[]},{"level":2,"heading":"3. The Conditions of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Guard God's sanctuary","bibleReferences":["2 Samuel 7:13"],"subsections":[]},{"level":2,"heading":"b. Keep God's law","bibleReferences":[],"subsections":[]},{"level":2,"heading":"c. Represent God's people","bibleReferences":[],"subsections":[]},{"level":2,"heading":"4. The Sanctions of the Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The judgment of God himself","bibleReferences":["2 Samuel 7:14","Psalm 132:11–12","1 Kings 8:25–26"],"subsections":[]},{"level":2,"heading":"b. Expulsion from the land of Canaan","bibleReferences":["1 Kings 9:4–9","1 Kings 11:11–13","2 Kings 23:26–27"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":9,"title":"Chapter 9: The Messiah of the Old Covenant","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Messianic Purpose of the Old Covenant","bibleReferences":["Romans 9:4","Ephesians 2:12","Hebrews 10:1"],"subsections":[]},{"level":2,"heading":"2. The Messianic Hope of the Old Covenant","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. The present Messiah","bibleReferences":["Psalm 18:50","Psalm 20:6–9","Psalm 132:10–18"],"subsections":[]},{"level":2,"heading":"b. The future Messiah","bibleReferences":["Hosea 6:7","Psalm 89:28–49","Jeremiah 33:14–18","Isaiah 9:1–7"],"subsections":[]},{"level":2,"heading":"3. The Messianic Promise of a New Covenant","bibleReferences":["Ezekiel 37:24–28","Jeremiah 31:31–34"],"subsections":[]},{"level":2,"heading":"4. The Messianic Inclusion of the Nations","bibleReferences":["Micah 4:1–4","Isaiah 2:2–4","Haggai 2:6–9","Isaiah 11:1–10"],"subsections":[]},{"level":2,"heading":"5. The Typological Nature of the Kingdom","bibleReferences":["Luke 1:26–33","Mark 1:14–15","John 1:41"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":10,"title":"Chapter 10: The Ministry of the Christ","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Gospel of the Kingdom","bibleReferences":["Mark 1:14–15","Luke 4:18","Matthew 11:28–30","Matthew 9:11–12","Mark 1:34","John 10:14–18","Ezekiel 34:22–25","John 11:25–27"],"subsections":[]},{"level":2,"heading":"2. The Kingdom of Heaven","bibleReferences":["John 18:36","John 3:3–6","Matthew 8:11–12","John 8:39","Matthew 16:16–19","Matthew 18:1–4","Matthew 8:10–12"],"subsections":[]},{"level":2,"heading":"3. The King of the Kingdom","bibleReferences":["Matthew 5:17–20","Matthew 21:9"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":11,"title":"Chapter 11: The Covenant of Redemption","sections":[{"level":2,"heading":"Introduction","bibleReferences":["2 Timothy 1:9","Titus 1:2"],"subsections":[]},{"level":2,"heading":"1. The Parties of the Covenant","bibleReferences":["Isaiah 42:1–7","Isaiah 49:8–9","Isaiah 50:4–9","Luke 4:17–21"],"subsections":[]},{"level":2,"heading":"a. The Son's commitments","bibleReferences":["John 10:17–18","Psalm 2:6–9","Psalm 110:4","Hebrews 7:28","Isaiah 61:1–2","John 17:8"],"subsections":[]},{"level":2,"heading":"b. The Father's commitments","bibleReferences":["Isaiah 42:6","Isaiah 49:8","Isaiah 50:7","Luke 1:35","Matthew 12:27–28","Hebrews 9:14","Isaiah 53:10–12","Philippians 2:8–11","1 John 3:8"],"subsections":[]},{"level":2,"heading":"3. The Fulfillment of the Covenant","bibleReferences":["Philippians 2:5–8","Isaiah 50:5–7","Isaiah 53:10–12","Acts 2:32–33","Hebrews 10:12–14","Revelation 5:12","Hebrews 5:3"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":12,"title":"Chapter 12: The New Covenant of Grace","sections":[{"level":2,"heading":"Introduction","bibleReferences":["Matthew 1:1","Luke 1:68–75","Galatians 4:4–5"],"subsections":[]},{"level":2,"heading":"1. The Establishment of the New Covenant","bibleReferences":["Hebrews 8:6","Hebrews 9:11–15","Ephesians 2:16","Colossians 1:20–22","Hebrews 9:24–26"],"subsections":[]},{"level":2,"heading":"2. The Blessings of the New Covenant","bibleReferences":["Jeremiah 31:31–34","Hebrews 8:8–13"],"subsections":[]},{"level":2,"heading":"a. Justification","bibleReferences":["Romans 5:17–19","Hebrews 10:14","Psalm 103:12","Isaiah 53:5","Hebrews 9:9–10","Hebrews 9:13–14","Isaiah 53:11","Romans 5:18–19","Romans 5:1–2","Romans 10:9–13"],"subsections":[]},{"level":2,"heading":"b. Regeneration and Sanctification","bibleReferences":["Jeremiah 31:33–34","Ezekiel 36:26–27","Deuteronomy 10:16","Jeremiah 4:4","Deuteronomy 30:6","John 3:3","Colossians 1:12","1 Corinthians 15:48","Ephesians 4:23","Colossians 3:10","Romans 6:17–18","Ephesians 2:1–10","2 Corinthians 3:5–9","Romans 3:20","Romans 5:1–2","Isaiah 54:13","John 6:45","Jeremiah 31:34","1 John 2:20–21","Romans 10:17","James 1:18","1 Peter 1:23"],"subsections":[]},{"level":2,"heading":"c. Adoption and Preservation","bibleReferences":["John 1:12–13","Romans 8:15","1 John 3:1–2","Hebrews 12:3–11","Jeremiah 32:40"],"subsections":[]},{"level":2,"heading":"d. Resurrection and Glorification","bibleReferences":["Psalm 16:10","Romans 4:25","John 6:39–40","Hebrews 2:10","Colossians 1:18","1 Corinthians 15:45","Colossians 3:1–4","1 Corinthians 15:54–57","Mark 3:22–27","Colossians 1:12","Romans 8:18–25","1 Corinthians 2:9","2 Corinthians 4:13–18","Revelation 22:4","2 Corinthians 4:6","Psalm 73:23–28","Psalm 16:11"],"subsections":[]},{"level":2,"heading":"3. The Foundation of the New Covenant","bibleReferences":["Hebrews 7:22","Ephesians 1:11","Hebrews 9:15","Romans 8:9","1 John 5:11–13","Hebrews 6:13–16","Hebrews 6:17–20","Hebrews 7:15–22","Jeremiah 31:32","Ephesians 2:8–9"],"subsections":[]},{"level":2,"heading":"4. The Kingdom of the New Covenant","bibleReferences":["Colossians 1:18","Luke 22:29"],"subsections":[]},{"level":2,"heading":"5. The People of the New Covenant","bibleReferences":["Romans 8:1","Romans 8:9","Romans 8:14","Romans 8:17","Romans 8:29–30","Romans 8:31","Romans 8:33–39","Colossians 1:12–14"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":[],"subsections":[]}]},{"chapterNumber":13,"title":"Chapter 13: The Mystery of Christ","sections":[{"level":2,"heading":"Introduction","bibleReferences":["2 Timothy 1:9","Titus 1:2","Romans 1:16","Acts 1:6"],"subsections":[]},{"level":2,"heading":"1. The Unity of God's Plan","bibleReferences":["Ephesians 1:9–10","Acts 2:38–39","Colossians 1:25–28","Colossians 2:4–23","Ephesians 3:1–6","1 Peter 1:10–12"],"subsections":[]},{"level":2,"heading":"2. Israel, Christ, and the Church","bibleReferences":["Acts 28:23","Acts 19:8–9"],"subsections":[]},{"level":2,"heading":"a. Israel","bibleReferences":["Romans 11:1","Romans 4:1","2 Corinthians 11:22","Acts 3:25–26","Romans 9:3–5","Ephesians 2:12","Romans 10:4","Romans 4:9–17","Romans 4:11","John 8:37","John 8:39","Romans 9:8","Romans 4:12","Galatians 3:7","Galatians 3:16–17","Galatians 3:15","Galatians 3:19–22","Galatians 4:21–31","2 Corinthians 3:14–16","Romans 3:1–4","Matthew 20:1–16","John 1:11"],"subsections":[]},{"level":2,"heading":"b. The Christ","bibleReferences":["Matthew 1:1","Romans 1:16","Romans 11:1","Romans 4:1","2 Corinthians 11:22","Romans 11:1–10","Romans 11:23"],"subsections":[]},{"level":2,"heading":"c. The Church","bibleReferences":["Psalm 118:22–23","Ephesians 2:19–22","1 Peter 2:4–10","John 1:12–13","Philippians 3:3","Colossians 1:18","Galatians 3:26–28","Romans 11:16–24","Galatians 6:16","2 Corinthians 5:16–17","Galatians 3:24","Hebrews 8:13"],"subsections":[]},{"level":2,"heading":"3. The Continuity of the Law and the Gospel","bibleReferences":["John 8:56","Romans 4:6–8","1 Corinthians 10:1–4","Galatians 3:8","Hebrews 9:25–26","Psalm 32:1","Romans 4:7–8","Matthew 5:20–24","Romans 2:14–15","Romans 13:8–10","1 John 5:1–3","Jeremiah 31:33"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Colossians 4:3–4","Romans 11:33–36"],"subsections":[]}]},{"chapterNumber":14,"title":"Chapter 14: The Eschatological Nature of the Kingdom","sections":[{"level":2,"heading":"Introduction","bibleReferences":[],"subsections":[]},{"level":2,"heading":"1. The Kingdom Inaugurated","bibleReferences":["Romans 10:14–15","2 Corinthians 5:20","Revelation 2:5","Romans 8:9","John 3:3"],"subsections":[]},{"level":2,"heading":"2. The Keys of the Kingdom","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Joining the kingdom through the covenant","bibleReferences":["1 Peter 4:3","Romans 10:9","Hebrews 9:15"],"subsections":[]},{"level":2,"heading":"b. Guarding the kingdom through the covenant","bibleReferences":["1 John 1:10","Hebrews 12:14","John 3:18"],"subsections":[]},{"level":2,"heading":"c. Traitors of the kingdom","bibleReferences":["1 John 2:19","Acts 8:13","2 Peter 2:1","Hebrews 6:4–6","Psalm 50:16"],"subsections":[]},{"level":2,"heading":"3. The Sacraments of the Kingdom","bibleReferences":[],"subsections":[]},{"level":2,"heading":"a. Baptism","bibleReferences":["Romans 6:3–5","1 Peter 3:21–22","1 Corinthians 5:11"],"subsections":[]},{"level":2,"heading":"b. The Lord's Supper","bibleReferences":["Hebrews 10:23–25"],"subsections":[]},{"level":2,"heading":"4. The Kingdom Consummated","bibleReferences":["Acts 17:31","Acts 17:30","Psalm 2:12","2 Peter 3:15","2 Thessalonians 1:4–10","Hebrews 9:27–28","Matthew 25:31–46","Revelation 20:15","1 Corinthians 15:24","Revelation 21:1–7","Revelation 21:12","Revelation 21:26","Revelation 22:2","Revelation 21:23","Revelation 5:9–10","Revelation 21:3–4","Revelation 22:4","Revelation 22:16–18"],"subsections":[]},{"level":2,"heading":"Conclusion","bibleReferences":["Romans 9:5"],"subsections":[]}]},{"chapterNumber":15,"title":"Conclusion","sections":[{"level":1,"heading":"Conclusion","bibleReferences":["Romans 8:32","Hebrews 6:19","Romans 10:11–13","Ephesians 3:14–21"],"subsections":[]}]}]}

// ── Parts map ─────────────────────────────────────────────────────────────────

const PARTS: Record<number, string> = {
  1: 'Part One: Methodology and Hermeneutics',
  4: 'Part Two: The Kingdom of Creation',
  6: 'Part Three: The Kingdom of Israel',
  10: 'Part Four: The Kingdom of Christ',
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Section {
  level: number
  heading: string
  bibleReferences: string[]
  subsections: Section[]
}

interface Chapter {
  chapterNumber: number
  title: string
  sections: Section[]
}

interface VerseResult {
  reference: string
  text: string
  verses: { book_name: string; chapter: number; verse: number; text: string }[]
}

// ── Bible modal ───────────────────────────────────────────────────────────────

function BibleModal({ reference, onClose }: { reference: string; onClose: () => void }) {
  const [data, setData] = useState<VerseResult | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setData(null)
    setError(false)
    const normalized = reference.replace(/–|—/g, '-').trim()
    fetch(`https://bible-api.com/${encodeURIComponent(normalized)}?translation=kjv`)
      .then(r => r.json())
      .then(json => {
        if (json.error) setError(true)
        else setData(json)
      })
      .catch(() => setError(true))
  }, [reference])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="bible-modal-backdrop" onClick={onClose}>
      <div className="bible-modal" onClick={e => e.stopPropagation()}>
        <div className="bible-modal-header">
          <span className="bible-modal-ref">{reference}</span>
          <button className="bible-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="bible-modal-body">
          {!data && !error && <p className="bible-modal-loading">Loading…</p>}
          {error && <p className="bible-modal-loading">Could not load passage.</p>}
          {data && (
            <>
              {data.verses.map((v, i) => (
                <p key={i} className="bible-modal-verse">
                  <sup className="bible-modal-versenum">{v.verse}</sup>
                  {v.text}
                </p>
              ))}
              <p className="bible-modal-translation">King James Version</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Section component ─────────────────────────────────────────────────────────

function SectionRow({ section, globalOpen, onRef }: { section: Section; globalOpen: boolean | null; onRef: (ref: string) => void }) {
  const [open, setOpen] = useState(false)
  const hasContent = section.bibleReferences.length > 0 || section.subsections.length > 0

  useEffect(() => { if (globalOpen !== null) setOpen(globalOpen) }, [globalOpen])

  return (
    <div className="study-section">
      <div
        className={`study-section-header${hasContent ? ' clickable' : ''}`}
        onClick={() => hasContent && setOpen(o => !o)}
      >
        <span className={`study-toggle${!hasContent ? ' invisible' : ''}`}>
          {open ? '▾' : '▸'}
        </span>
        <span className="study-section-title">{section.heading}</span>
      </div>

      {hasContent && open && (
        <div className="study-section-body">
          {section.bibleReferences.length > 0 && (
            <div className="study-refs">
              {section.bibleReferences.map((ref, i) => (
                <span key={i} className="study-ref-tag" onClick={() => onRef(ref)}>{ref}</span>
              ))}
            </div>
          )}
          {section.subsections.map((sub, i) => (
            <SectionRow key={i} section={sub} globalOpen={globalOpen} onRef={onRef} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Study questions panel ─────────────────────────────────────────────────────

function StudyQuestions({
  chapterNum,
  questions,
  isAdmin,
  onSave,
}: {
  chapterNum: number
  questions: string[]
  isAdmin: boolean
  onSave: (chapterNum: number, questions: string[]) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(questions.join('\n'))

  useEffect(() => { setDraft(questions.join('\n')) }, [questions])

  if (!isAdmin && questions.length === 0) return null

  return (
    <div className="study-questions">
      <div className="study-questions-header">
        <span className="study-questions-label">Study Questions</span>
        {isAdmin && !editing && (
          <button className="study-questions-edit-btn" onClick={() => setEditing(true)}>
            {questions.length === 0 ? '+ Add questions' : 'Edit'}
          </button>
        )}
      </div>

      {editing ? (
        <div className="study-questions-editor">
          <p className="study-questions-hint">One question per line.</p>
          <textarea
            className="study-questions-textarea"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={6}
            placeholder="Enter study questions, one per line…"
          />
          <div className="study-questions-actions">
            <button className="study-btn" onClick={() => {
              const qs = draft.split('\n').map(q => q.trim()).filter(Boolean)
              onSave(chapterNum, qs)
              setEditing(false)
            }}>Save</button>
            <button className="study-btn study-btn-ghost" onClick={() => {
              setDraft(questions.join('\n'))
              setEditing(false)
            }}>Cancel</button>
          </div>
        </div>
      ) : (
        questions.length > 0 && (
          <ol className="study-questions-list">
            {questions.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        )
      )}
    </div>
  )
}

// ── Chapter component ─────────────────────────────────────────────────────────

function ChapterRow({
  chapter, globalOpen, onRef, questions, isAdmin, onSaveQuestions,
}: {
  chapter: Chapter
  globalOpen: boolean | null
  onRef: (ref: string) => void
  questions: string[]
  isAdmin: boolean
  onSaveQuestions: (chapterNum: number, questions: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => { if (globalOpen !== null) setOpen(globalOpen) }, [globalOpen])

  const label = chapter.chapterNumber === 0 ? 'Preface'
    : chapter.chapterNumber === 15 ? 'Conclusion'
    : `Ch. ${chapter.chapterNumber}`

  return (
    <div className="study-chapter">
      <div className="study-chapter-header" onClick={() => setOpen(o => !o)}>
        <span className="study-chapter-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-chapter-num">{label}</span>
        <span className="study-chapter-title">{chapter.title}</span>
      </div>

      {open && (
        <div className="study-chapter-body">
          {chapter.sections.map((section, i) => (
            <SectionRow key={i} section={section} globalOpen={globalOpen} onRef={onRef} />
          ))}
          <StudyQuestions
            chapterNum={chapter.chapterNumber}
            questions={questions}
            isAdmin={isAdmin}
            onSave={onSaveQuestions}
          />
        </div>
      )}
    </div>
  )
}

// ── Part component ────────────────────────────────────────────────────────────

function PartRow({
  title, chapters, globalOpen, onRef, allQuestions, isAdmin, onSaveQuestions,
}: {
  title: string
  chapters: Chapter[]
  globalOpen: boolean | null
  onRef: (ref: string) => void
  allQuestions: Record<string, string[]>
  isAdmin: boolean
  onSaveQuestions: (chapterNum: number, questions: string[]) => void
}) {
  const [open, setOpen] = useState(true)

  useEffect(() => { if (globalOpen !== null) setOpen(globalOpen) }, [globalOpen])

  return (
    <div className="study-part">
      <div className="study-part-header" onClick={() => setOpen(o => !o)}>
        <span className="study-part-toggle">{open ? '▾' : '▸'}</span>
        <span className="study-part-title">{title}</span>
      </div>
      {open && (
        <div className="study-part-body">
          {chapters.map((ch, i) => (
            <ChapterRow
              key={i}
              chapter={ch}
              globalOpen={globalOpen}
              onRef={onRef}
              questions={allQuestions[String(ch.chapterNumber)] ?? []}
              isAdmin={isAdmin}
              onSaveQuestions={onSaveQuestions}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function StudyPage() {
  const [globalOpen, setGlobalOpen] = useState<boolean | null>(null)
  const [activeRef, setActiveRef] = useState<string | null>(null)
  const [allQuestions, setAllQuestions] = useState<Record<string, string[]>>({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem('tc-auth') === '1')
    fetch('/api/study-questions/mystery-of-christ')
      .then(r => r.json())
      .then(setAllQuestions)
      .catch(() => {})
  }, [])

  async function handleSaveQuestions(chapterNum: number, questions: string[]) {
    const updated = { ...allQuestions, [String(chapterNum)]: questions }
    setAllQuestions(updated)
    setSaving(true)
    await fetch('/api/study-questions/mystery-of-christ', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    })
    setSaving(false)
  }

  const chapters = outlineData.chapters as Chapter[]
  const preface = chapters.filter(c => c.chapterNumber === 0)
  const conclusion = chapters.filter(c => c.chapterNumber === 15)
  const partChapters: Record<string, Chapter[]> = {
    '1': chapters.filter(c => c.chapterNumber >= 1 && c.chapterNumber <= 3),
    '4': chapters.filter(c => c.chapterNumber >= 4 && c.chapterNumber <= 5),
    '6': chapters.filter(c => c.chapterNumber >= 6 && c.chapterNumber <= 9),
    '10': chapters.filter(c => c.chapterNumber >= 10 && c.chapterNumber <= 14),
  }

  return (
    <div className="main">
      {activeRef && <BibleModal reference={activeRef} onClose={() => setActiveRef(null)} />}

      <div className="study-page-header">
        <div className="section-label">Study</div>
        <h1 className="study-book-title">The Mystery of Christ</h1>
        <p className="study-book-author">Samuel Renihan</p>
        <p className="study-book-subtitle">His Covenant, and His Kingdom</p>
      </div>

      <div className="study-controls">
        <button className="study-btn" onClick={() => { setGlobalOpen(true); setTimeout(() => setGlobalOpen(null), 0) }}>Expand All</button>
        <button className="study-btn" onClick={() => { setGlobalOpen(false); setTimeout(() => setGlobalOpen(null), 0) }}>Collapse All</button>
        {saving && <span className="study-saving">Saving…</span>}
      </div>

      <div className="study-outline">
        {preface.map((ch, i) => (
          <ChapterRow key={i} chapter={ch} globalOpen={globalOpen} onRef={setActiveRef}
            questions={allQuestions[String(ch.chapterNumber)] ?? []}
            isAdmin={isAdmin} onSaveQuestions={handleSaveQuestions} />
        ))}

        {Object.entries(PARTS).map(([startNum, partTitle]) => (
          <PartRow
            key={startNum}
            title={partTitle}
            chapters={partChapters[startNum] ?? []}
            globalOpen={globalOpen}
            onRef={setActiveRef}
            allQuestions={allQuestions}
            isAdmin={isAdmin}
            onSaveQuestions={handleSaveQuestions}
          />
        ))}

        {conclusion.map((ch, i) => (
          <ChapterRow key={i} chapter={ch} globalOpen={globalOpen} onRef={setActiveRef}
            questions={allQuestions[String(ch.chapterNumber)] ?? []}
            isAdmin={isAdmin} onSaveQuestions={handleSaveQuestions} />
        ))}
      </div>

      <p className="study-footer-note">
        This is a study outline of <em>The Mystery of Christ, His Covenant, and His Kingdom</em> by Samuel Renihan (Founders Press).
        Outlines contain paraphrased summaries and Bible references for study purposes — not a substitute for the full book.{' '}
        <a href="https://www.amazon.com/Mystery-Christ-His-Covenant-Kingdom/dp/1644340038" target="_blank" rel="noopener noreferrer">
          Purchase the book →
        </a>
      </p>
    </div>
  )
}
