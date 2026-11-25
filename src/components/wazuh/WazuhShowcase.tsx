'use client';

import React, { useState } from 'react';
import styles from './WazuhShowcase.module.css';

export default function WazuhShowcase() {
  const [activeTab, setActiveTab] = useState<
    'arch' | 'rules' | 'compliance' | 'simulation' | 'faq'
  >('arch');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Wazuh SIEM compare to Splunk and Microsoft Sentinel?',
      a: 'While Splunk and Microsoft Sentinel charge astronomical fees based on gigabytes of data ingested (often exceeding $80,000 to $150,000 per year for mid-sized enterprises), Wazuh is open-source with zero software licensing costs. You get full log aggregation, vulnerability detection, FIM, and compliance reporting with complete control over your data sovereignty.',
    },
    {
      q: 'How do you deploy Wazuh agents silently across 200+ endpoints?',
      a: 'For Windows Active Directory environments, I engineer PowerShell rollout scripts packaged with Group Policy Objects (GPO) or Microsoft Intune, automatically registering agents against the Wazuh Manager using auth tokens. For Linux and cloud workloads, deployment is fully automated via Ansible playbooks or Docker/Kubernetes daemonsets.',
    },
    {
      q: 'What hardware is required for a production Wazuh cluster?',
      a: 'For an enterprise ingesting ~1,000 Events Per Second (EPS), a production cluster typically utilizes 3 Wazuh Indexer nodes (8 vCPUs, 16GB RAM each, NVMe storage) and 2 Wazuh Manager nodes in a load-balanced high-availability cluster, providing sub-second search speeds and 1-year log retention.',
    },
    {
      q: 'Does this architecture satisfy German BSI IT-Grundschutz and EU GDPR?',
      a: 'Yes. For European and German clients (targeting "SIEM mit Wazuh"), the architecture supports full on-premise self-hosting in local Frankfurt/EU data centers, TLS 1.3 encryption across all agent-manager channels, pseudonymized log processing, and automated GDPR compliance reporting.',
    },
    {
      q: 'How can enterprises hire Sardar Awais for Wazuh deployment & SOC architecture?',
      a: 'I provide end-to-end consulting: cluster sizing, Docker/Kubernetes deployment, custom decoders for your specific firewalls/SaaS tools, false-positive tuning, and automated alerting integrations (Slack, Telegram, PagerDuty). Contact me directly through the portfolio to schedule a technical discovery call.',
    },
  ];

  return (
    <div className={styles.showcaseContainer}>
      {/* ── Top SOC Status Bar ── */}
      <div className={styles.socBanner}>
        <div className={styles.socBadge}>
          <span className={styles.socPulse} />
          <span>PRODUCTION BLUEPRINT: Enterprise Wazuh SIEM Cluster</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span className={styles.socMetric}>Cluster State: HEALTHY_GREEN</span>
          <span className={styles.socMetric}>EPS Ingestion: 1,450 EPS</span>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className={styles.tabsBar}>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'arch' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('arch')}
        >
          🏗️ Cluster Architecture
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'rules' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('rules')}
        >
          🛡️ Custom Decoders & Rules (XML)
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'compliance' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('compliance')}
        >
          📜 Compliance Standards
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'simulation' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('simulation')}
        >
          ⚡ Live Threat Alerts & Active Response
        </button>
        <button
          className={`${styles.tabBtn} ${
            activeTab === 'faq' ? styles.activeTabBtn : ''
          }`}
          onClick={() => setActiveTab('faq')}
        >
          ❓ Enterprise FAQs & Sizing
        </button>
      </div>

      {/* ── TAB 1: ARCHITECTURE ── */}
      {activeTab === 'arch' && (
        <div>
          <div className={styles.archGrid}>
            <div className={styles.archCard}>
              <div className={styles.cardIcon}>⚡</div>
              <h4 className={styles.cardTitle}>Wazuh Server & Manager</h4>
              <p className={styles.cardDesc}>
                The core analytical engine. Runs analysisd, decodes incoming syslog
                streams, checks signatures against MITRE ATT&CK, and triggers
                automated active responses (IP bans, firewall blocks).
              </p>
            </div>

            <div className={styles.archCard}>
              <div className={styles.cardIcon}>🔍</div>
              <h4 className={styles.cardTitle}>Wazuh Indexer (OpenSearch)</h4>
              <p className={styles.cardDesc}>
                High-performance, distributed full-text search engine. Indexes
                millions of security events per hour with index lifecycle
                management (ILM) for automated cold storage.
              </p>
            </div>

            <div className={styles.archCard}>
              <div className={styles.cardIcon}>🖥️</div>
              <h4 className={styles.cardTitle}>Wazuh Web Dashboard</h4>
              <p className={styles.cardDesc}>
                Real-time security telemetry interface. Visualizes endpoint
                compliance, CIS benchmark audit scores, vulnerability feeds, and
                FIM file modification timelines.
              </p>
            </div>

            <div className={styles.archCard}>
              <div className={styles.cardIcon}>🛡️</div>
              <h4 className={styles.cardTitle}>Multi-Platform Endpoint Agents</h4>
              <p className={styles.cardDesc}>
                Lightweight C-based agents installed across Linux (Ubuntu, RHEL,
                Debian), Windows Server (Active Directory), and macOS. Ingests
                system logs, auditd, and event viewers.
              </p>
            </div>
          </div>

          <div className={styles.codeTerminal}>
            <div className={styles.terminalHeader}>
              <span>docker-compose.production.yml (Distributed Multi-Node Architecture)</span>
              <span>TLS 1.3 Certified</span>
            </div>
            <pre className={styles.codeBlock}>
{`version: '3.8'
services:
  wazuh.indexer:
    image: wazuh/wazuh-indexer:4.9.0
    container_name: wazuh.indexer
    restart: always
    ports:
      - "9200:9200"
    environment:
      - "OPENSEARCH_JAVA_OPTS=-Xms8g -Xmx8g"
      - "cluster.name=wazuh-enterprise-soc"
      - "node.name=indexer-node-01"
    volumes:
      - wazuh-indexer-data:/var/lib/wazuh-indexer

  wazuh.manager:
    image: wazuh/wazuh-manager:4.9.0
    container_name: wazuh.manager
    restart: always
    ports:
      - "1514:1514/udp"   # Agent event channel
      - "1515:1515"       # Agent enrollment
      - "55000:55000"     # RESTful Management API
    volumes:
      - ./config/local_rules.xml:/var/ossec/etc/rules/local_rules.xml
      - ./config/local_decoder.xml:/var/ossec/etc/decoders/local_decoder.xml`}
            </pre>
          </div>
        </div>
      )}

      {/* ── TAB 2: RULES & DECODERS ── */}
      {activeTab === 'rules' && (
        <div>
          <p style={{ color: '#a0a0b8', fontSize: '0.92rem', marginBottom: '16px' }}>
            Production Wazuh deployments require custom XML decoders and correlation
            rules to parse enterprise firewalls (Fortinet, pfSense), cloud audit
            logs, and brute-force patterns.
          </p>

          <div className={styles.codeTerminal}>
            <div className={styles.terminalHeader}>
              <span>/var/ossec/etc/rules/local_rules.xml (SSH & Web Brute-Force Rule)</span>
              <span>Rule ID: 100002 • Level 10 (Critical)</span>
            </div>
            <pre className={styles.codeBlock}>
{`<group name="custom_intrusion_detection,">
  <!-- Rule to detect repetitive failed authentication across endpoints -->
  <rule id="100002" level="10" frequency="5" timeframe="60">
    <if_matched_sid>5710</if_matched_sid>
    <same_source_ip />
    <description>SOC Alert: Multiple SSH authentication failures from single IP $(srcip)</description>
    <mitre>
      <id>T1110.001</id>
      <tactic>Credential Access</tactic>
    </mitre>
    <group>authentication_failures,pci_dss_10.2.4,pci_dss_10.2.5,gdpr_IV_35.7.d</group>
  </rule>
</group>`}
            </pre>
          </div>
        </div>
      )}

      {/* ── TAB 3: COMPLIANCE ── */}
      {activeTab === 'compliance' && (
        <div className={styles.complianceGrid}>
          <div className={styles.complianceCard}>
            <h4 className={styles.complianceTitle}>💳 PCI-DSS 4.0</h4>
            <p className={styles.complianceDesc}>
              Automated audit trails for credit card transaction environments.
              Meets Requirement 10 (Log Monitoring) and Requirement 11.5 (File
              Integrity Monitoring).
            </p>
          </div>

          <div className={styles.complianceCard}>
            <h4 className={styles.complianceTitle}>🏥 HIPAA Security Rule</h4>
            <p className={styles.complianceDesc}>
              Monitors Electronic Protected Health Information (ePHI) access logs,
              detects unauthorized privilege escalation, and records user activity
              audit records.
            </p>
          </div>

          <div className={styles.complianceCard}>
            <h4 className={styles.complianceTitle}>🇪🇺 EU GDPR Article 32</h4>
            <p className={styles.complianceDesc}>
              Demonstrates state-of-the-art technical security controls. Real-time
              data breach detection to comply with the 72-hour regulatory reporting
              mandate.
            </p>
          </div>

          <div className={styles.complianceCard}>
            <h4 className={styles.complianceTitle}>🇩🇪 BSI IT-Grundschutz</h4>
            <p className={styles.complianceDesc}>
              Configured specifically for DACH / German enterprise standards (OPS.1.1.5
              Protokollierung). Zero telemetry leakage to US commercial clouds.
            </p>
          </div>
        </div>
      )}

      {/* ── TAB 4: THREAT SIMULATION ── */}
      {activeTab === 'simulation' && (
        <div className={styles.threatTimeline}>
          <div className={styles.threatItem}>
            <div className={styles.threatMeta}>
              <span className={styles.threatTitle}>
                🚨 T1110.001: SSH Password Spray Attack Detected
              </span>
              <span className={styles.threatDetail}>
                Source: 198.51.100.42 • Target: auth-node-01 • Matched Rule: 100002
              </span>
            </div>
            <span className={styles.actionBadge}>
              Active Response: IP Banned via iptables (1 hr)
            </span>
          </div>

          <div className={styles.threatItem}>
            <div className={styles.threatMeta}>
              <span className={styles.threatTitle}>
                ⚠️ T1070.004: File Integrity Alert (/etc/shadow modified)
              </span>
              <span className={styles.threatDetail}>
                Checksum mismatch (SHA-256) • User: root • Monitored by syscheck
              </span>
            </div>
            <span className={styles.actionBadge} style={{ background: 'rgba(255, 0, 51, 0.15)', color: '#ff334b', borderColor: 'rgba(255, 0, 51, 0.3)' }}>
              Slack Alert Dispatched to SOC Team
            </span>
          </div>

          <div className={styles.threatItem}>
            <div className={styles.threatMeta}>
              <span className={styles.threatTitle}>
                🛡️ CVE-2024-6387 (RegreSSHion) Vulnerability Flagged
              </span>
              <span className={styles.threatDetail}>
                Vulnerability detector matched OpenSSH package version on 12 hosts
              </span>
            </div>
            <span className={styles.actionBadge}>
              Automated Patch Ticket Created in Jira
            </span>
          </div>
        </div>
      )}

      {/* ── TAB 5: FAQ ACCORDION ── */}
      {activeTab === 'faq' && (
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span>{faq.q}</span>
                <span>{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
