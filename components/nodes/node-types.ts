import { NodeType } from '../../diagram.enum'
import NodeDatabase from './NodeDatabase'
import NodeQueue from './NodeQueue'
import NodeService from './NodeService'
import NodeUsers from './NodeUsers'

export default {
  [NodeType.Database]: NodeDatabase,
  [NodeType.Service]: NodeService,
  [NodeType.Users]: NodeUsers,
  [NodeType.Queue]: NodeQueue,
}
