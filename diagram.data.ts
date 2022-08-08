import { nodeConfigMap } from './diagram.config'
import { ContainerType, NodeType } from './diagram.enum'
import type { Diagram } from './diagram.type'

const n1 = 'n1'
const n2 = 'n2'
const n3 = 'n3'
const n4 = 'n4'

export const diagramTemplate: Diagram = {
  flowData: {
    nodes: [
      {
        id: n1,
        type: NodeType.Database,
        data: {
          label: nodeConfigMap.get(NodeType.Database)!.data.label,
          container: ContainerType.Multiple,
          // icon: 'postgresql',
        },
        position: { x: 0, y: 0 },
      },
      {
        id: n2,
        type: NodeType.Users,
        data: {
          label: nodeConfigMap.get(NodeType.Users)!.data.label,
          container: ContainerType.Single,
          icon: 'mobile',
        },
        position: { x: 0, y: 200 },
      },
      {
        id: n3,
        type: NodeType.Service,
        data: {
          label: nodeConfigMap.get(NodeType.Service)!.data.label,
          container: ContainerType.External,
          // icon: 'nginx',
        },
        position: { x: 200, y: 200 },
      },
      {
        id: n4,
        type: NodeType.Queue,
        data: {
          label: nodeConfigMap.get(NodeType.Queue)!.data.label,
          container: ContainerType.None,
        },
        position: { x: 200, y: 0 },
      },
    ],
    edges: [],
  },
}

interface Icon {
  type: NodeType | 'app' | 'stack'
  label: string
  value: string
}

export const iconSet: Icon[] = [
  { type: NodeType.Database, label: 'MySQL', value: 'mysql' },
  { type: NodeType.Database, label: 'MongoDB', value: 'mongodb' },
  { type: NodeType.Database, label: 'PostgreSQL', value: 'postgresql' },
  { type: NodeType.Database, label: 'GraphQL', value: 'graphql' },
  { type: NodeType.Database, label: 'Redis', value: 'redis' },
  { type: NodeType.Database, label: 'SQLite', value: 'sqlite' },

  { type: NodeType.Service, label: 'Nginx', value: 'nginx' },
  { type: NodeType.Service, label: 'Docker', value: 'docker' },
  { type: NodeType.Service, label: 'Apache Tomcat', value: 'tomcat' },

  { type: 'app', label: 'Go', value: 'go' },
  { type: 'app', label: 'Java', value: 'java' },
  { type: 'app', label: 'Node.js', value: 'nodejs' },
  { type: 'app', label: 'Python', value: 'python' },
  { type: 'app', label: 'Rust', value: 'rust' },
  { type: 'app', label: 'Swift', value: 'swift' },
  { type: 'app', label: 'TypeScript', value: 'typescript' },
  { type: 'app', label: 'Git', value: 'git' },

  { type: 'stack', label: 'CSS 3', value: 'css3' },
  { type: 'stack', label: 'HTML 5', value: 'html5' },
  { type: 'stack', label: 'Tailwind CSS', value: 'tailwindcss' },
  { type: 'stack', label: 'Angular', value: 'angular' },
  { type: 'stack', label: 'Vue', value: 'vue' },
  { type: 'stack', label: 'React', value: 'react' },
  { type: 'stack', label: 'Nuxt', value: 'nuxt' },
  { type: 'stack', label: 'Spring', value: 'spring' },
]
